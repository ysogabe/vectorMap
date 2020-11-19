import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';
import RenderFeature from 'ol/render/Feature';
import { FeatureLike } from 'ol/Feature';

export default function vtStyle(feature: FeatureLike, resolution: number) {
  // RenderFeature から properties を取得
  const properties = feature.getProperties();
  // properties に格納されているレイヤ名からスタイルを書き分ける
  if (properties.layer === 'road') {
    let c = '#ddd';
    let w = 2;
    // 高速道路
    if (properties.rdCtg === 3) {
      return new Style({
        stroke: new Stroke({
          color: 'red',
          width: 5,
        }),
        zIndex: 2,
      });
      // 国道
    } else if (properties.rdCtg === 0) {
      return new Style({
        stroke: new Stroke({
          color: 'blue',
          width: 5,
        }),
        zIndex: 1,
      });
      // 幅員13ｍ以上
    } else if (properties.rnkWidth === 3 || properties.rnkWidth === 4) {
      return new Style({
        stroke: new Stroke({
          color: 'green',
          width: 5,
        }),
        zIndex: 0,
      });
    }
    // それ以外の道は描画しない
    return new Style();
  } else if (properties.layer === 'railway') {
    return new Style({
      stroke: new Stroke({
        color: 'gray',
        width: 2,
      }),
      zIndex: 0,
    });
  } else {
    // 空の new Style() を返すと何も描写しない
    return new Style();
  }
}
