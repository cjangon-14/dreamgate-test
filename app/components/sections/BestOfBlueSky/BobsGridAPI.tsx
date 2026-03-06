import { useEffect, useState, lazy, Suspense } from "react";
import AttractionCardAPI from "./AttractionCardAPI";
import type { Attraction } from "~/types";
import { attractions as localAttractions } from "~/data/attractions";
import { getAttractions } from "~/api/attractions";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";

const ThreeDots = lazy(() =>
  import("react-loader-spinner").then((m) => ({ default: m.ThreeDots })),
);

const normName = (s: string) => s.toLowerCase().trim();

const localStyleMap = Object.fromEntries(
  localAttractions.map((a, i) => [
    normName(a.name),
    {
      gradient: a.gradient,
      badgeColor: a.badgeColor,
      color: a.color,
      image_path: a.image_path,
      inclusions: a.inclusions,
      choices: a.choices,
      _order: i,
    },
  ]),
);

const localNameOrder = localAttractions.map((a) => normName(a.name));

const BobsGridAPI = () => {
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAttractions()
      .then((list) => {
        const merged = list
          .map((item) => {
            const local = localStyleMap[normName(item.name)] ?? {};
            return {
              ...item,
              gradient: local.gradient ?? item.gradient,
              badgeColor: local.badgeColor ?? item.badgeColor,
              color: local.color ?? item.color,
              image_path: local.image_path || item.image_path,
              inclusions: local.inclusions ?? item.inclusions,
              choices: local.choices ?? item.choices,
            };
          })
          .sort((a, b) => {
            const ai = localNameOrder.indexOf(normName(a.name));
            const bi = localNameOrder.indexOf(normName(b.name));
            return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
          });
        setAttractions(merged);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="space-y-4 flex gap-10 justify-center">
        {[1, 2, 3, 4].map((i) => (
          <div className="flex w-full max-w-xs flex-col gap-7">
            <div className="flex flex-col gap-3">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-8 w-full" />
            </div>
            <div className="flex flex-col gap-3">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-full" />
            </div>
            <Skeleton className="h-8 w-24" />
          </div>
        ))}
      </div>
    );

  if (error)
    return <p className="text-center text-red-500 py-12">Error: {error}</p>;

  return (
    <div className="grid-cards">
      {attractions.map((attraction) => (
        <AttractionCardAPI key={attraction.id} attraction={attraction} />
      ))}
    </div>
  );
};

export default BobsGridAPI;
