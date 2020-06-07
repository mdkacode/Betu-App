const trimText = (mytextvar: string, maxlimit: number = 12) => {
  return mytextvar.length > maxlimit
    ? mytextvar.substring(0, maxlimit - 3) + '...'
    : mytextvar;
};

const transformArray = (userData: any) => {
  let setData: any = [];
  userData.map((e: any) => e.shop_id && setData.push(e.shop_id));

  // console.log(setData)
  let sset = new Set(setData);
  // console.log(sset);
  // console.log(...sset)

  let finalArra: any = [];
  let prodcucts: any = [];

  sset.forEach((e) => {
    userData.forEach((element, i) => {
      if (e === element.shop_id) {
        prodcucts.push(element);
      }
      if (userData.length - 1 == i) {
        e && finalArra.push({storeId: e, prodcucts});
        prodcucts = [];
      }
    });
  });
  return finalArra;
};

function distance(lat1, lon1, lat2, lon2) {
  var R = 6371; // km
  var dLat = toRad(lat2 - lat1);
  var dLon = toRad(lon2 - lon1);
  var lat1 = toRad(lat1);
  var lat2 = toRad(lat2);

  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
}

// Converts numeric degrees to radians
function toRad(Value) {
  return (Value * Math.PI) / 180;
}

export default {trimText, transformArray, distance};
