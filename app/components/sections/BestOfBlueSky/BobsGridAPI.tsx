import { useEffect, useState, lazy, Suspense } from "react";
import AttractionCardAPI from "./AttractionCardAPI";
import type { Attraction } from "~/types";
import { attractions as localAttractions } from "~/data/attractions";
import { getAttractions } from "~/api/attractions";

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
      <div className="flex justify-center items-center py-12">
        <Suspense fallback={null}>
          <ThreeDots
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="audio-loading"
            wrapperStyle={{}}
            wrapperClass="wrapper-class"
            visible={true}
          />
        </Suspense>
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
