import { readFileSync, writeFileSync } from "node:fs";
import { geoContains } from "d3-geo";
import { feature } from "topojson-client";
const world = JSON.parse(readFileSync(new URL("../node_modules/world-atlas/countries-110m.json", import.meta.url), "utf8"));
const land = feature(world, world.objects.countries);
const points = [];
for (let lat = -84; lat <= 84; lat += 2) {
  for (let lon = -180; lon < 180; lon += 2) {
    if (geoContains(land, [lon, lat])) points.push([lat, lon]);
  }
}
writeFileSync(new URL("../src/content/globe-points.json", import.meta.url), JSON.stringify(points));
console.log(`Generated ${points.length} land dots`);
