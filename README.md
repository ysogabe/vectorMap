# LayerMap

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.2.

## TODO's

- [ ] ポイントを打てるようにする
- [ ] 凡例をつける
- [x] 地図のコピーライトを正しく表示する
- [ ] 全画面復帰後の画面サイズの調整

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## github page へのデプロイ

see. https://www.npmjs.com/package/angular-cli-ghpages

```bash
ng build --prod --base-href "https://ysogabe.github.io/vectorMap/layerMap/"
angular-cli-ghpages
```

## 参考

- [地理院地図 Vector（仮称）提供実験](https://github.com/gsi-cyberjapan/gsimaps-vector-experiment)
- [OpenLayers の実装例](https://qiita.com/cieloazul310/items/8999c88f1acf79632cd3)
- [地理院タイル](http://maps.gsi.go.jp/development/siyou.html)
- スタイル実装例

```js
{
options:
{
  attribution: '道路中心線',minZoom: 16,maxNativeZoom: 16, maxZoom: 18
},
geojsonOptions:
{
   style: function (feature) {
      if(feature.properties['rdCtg'] == "国道" || feature.properties['rdCtg'] == "都道府県道"){
        return {color:"#777777",weight:5,opacity:0.5,lineCap:"butt"};
      }
      else if(feature.properties['rdCtg'] == "高速自動車国道等"){
        return {color:"#ff1493",weight:5,opacity:0.5,lineCap:"butt"};
      }
      else{
       if(feature.properties['type']=="通常部"){
        return {color:"#aaaaaa",weight:2,opacity:0.5,lineCap:"butt"};
       }else{
        return {color:"#aaaaaa",weight:2,opacity:0.5,lineCap:"butt",dashArray:"5,5"};
       }
      }
   },
   onEachFeature: function (feature, layer) {

var lineproperties = {
"class":"クラス名",
"rID":"レコード ID",
"lfSpanFr":"整備データ登録日",
"lfSpanTo":"整備データ削除日",
"tmpFlg":"暫定フラグ",
"orgGILvl":"出典地理情報レベル",
"ftCode":"地物種別コード",
"admCode":"行政コード",
"devDate":"整備完了日",
"type":"種別",
"rdCtg":"道路分類",
"state":"道路状態",
"lvOrder":"階層順",
"name":"名称",
"comName":"通称",
"admOfcRd":"道路管理主体",
"rnkWidth":"幅員区分",
"Width":"実幅員",
"sectID":"区間ID",
"tollSect":"有料区分",
"medSect":"分離帯区分",
"motorway":"自動車専用道路",
"repLtdLvl":"表示限界地図情報レベル",
"rtCode":"路線コード"
};
var s = '<div class="popup">';
for(var k in feature.properties) {
 var v = feature.properties[k];
 if(v !== ""){s += lineproperties[k] + ': ' + v + '<br>';}
}
s += '</div>';
layer.bindPopup(s);

   }
}
}
```

## 試したいサンプル

- https://openlayers.org/en/latest/examples/vector-tile-info.html
- https://openlayers.org/en/latest/examples/snap.html
- https://openlayers.org/en/latest/examples/draw-features.html
- https://openlayers.org/en/latest/examples/layer-group.html
- https://openlayers.org/en/latest/examples/modify-features.html
- https://openlayers.org/en/latest/examples/measure.html
