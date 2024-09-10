export const FUNCXml2Json = (xml) => {
  // return;
  // Create the return object
  var obj = {},
    i,
    j,
    attribute,
    item,
    nodeName,
    old;

  if (xml.nodeType === 1) {
    // element
    // do attributes
    if (xml.attributes.length > 0) {
      obj["@attributes"] = {};
      for (j = 0; j < xml.attributes.length; j = j + 1) {
        attribute = xml.attributes.item(j);
        obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
      }
    }
  } else if (xml.nodeType === 3) {
    // text
    obj = xml.nodeValue;
  }

  // do children
  if (xml?.hasChildNodes) {
    for (i = 0; i < xml.childNodes.length; i = i + 1) {
      item = xml.childNodes.item(i);
      nodeName = item.nodeName;
      if (obj[nodeName] === undefined) {
        obj[nodeName] = FUNCXml2Json(item);
      } else {
        if (obj[nodeName].push === undefined) {
          old = obj[nodeName];
          obj[nodeName] = [];
          obj[nodeName].push(old);
        }
        obj[nodeName].push(FUNCXml2Json(item));
      }
    }
  }
  return obj;
};

export const FUNCIsXml = (filename) => {
  var isTrue = false;
  var extention = /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  if (extention !== undefined) {
    var realExtention = extention[0].toLowerCase();
    if (realExtention === "xml") isTrue = true;
  }
  return isTrue;
};

export const FUNCIsJSON = (data) => {
  try {
    var json = JSON.parse(data);
    return typeof json === "object";
  } catch (error) {
    return false;
  }
};
