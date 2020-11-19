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