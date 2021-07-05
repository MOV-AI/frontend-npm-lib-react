export default class MapLoader {
  constructor(yamlSrc) {
    this.yamlSrc = yamlSrc;
    this.cachedMap = null;
  }

  async load() {
    if (this.cachedMap) return this.cachedMap;
    const response = await fetch(MapLoader.getMapUrl(this.yamlSrc));
    const map = await this.parseYaml(await response.text());
    const ans = {
      textureSrc: map.image,
      resolution: map.resolution,
      origin: map.origin,
      imageSize: map.size
    };
    this.cachedMap = ans;
    return ans;
  }

  async parseYaml(yamlTxt) {
    const ans = {};
    const actionDict = {
      image: (k, v) => (ans[k] = MapLoader.getMapUrl(v)),
      resolution: (k, v) => (ans[k] = Number.parseFloat(v)),
      origin: (k, v) => (ans[k] = JSON.parse(v))
    };
    console.log("Yaml text", yamlTxt);
    yamlTxt
      .split("\n")
      .map(s => s.split(": "))
      .filter(split => split.length >= 2)
      .filter(split => split[0] in actionDict)
      .forEach(split => actionDict[split[0]](split[0], split[1]));
    ans["size"] = await this.getImageSize(ans["image"]);
    return ans;
  }

  getImageSize(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve([img.naturalWidth, img.naturalHeight]);
    });
  }
  static getMapUrl = src => `/static/maps/${src}`;
}
