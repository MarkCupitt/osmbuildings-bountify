/**
 * Copyright (C) 2014 OSM Buildings, Jan Marsch
 * A leightweight JavaScript library for visualizing building geometry on interactive maps.
 * @osmbuildings, http://osmbuildings.org
 */
//****** file: prefix.js ******

var OSMBuildings = (function() {

    'use strict';


//****** file: shortcuts.js ******

// object access shortcuts
var
  m = Math,
  exp = m.exp,
  log = m.log,
  sin = m.sin,
  cos = m.cos,
  tan = m.tan,
  atan = m.atan,
  atan2 = m.atan2,
  min = m.min,
  max = m.max,
  sqrt = m.sqrt,
  ceil = m.ceil,
  floor = m.floor,
  round = m.round,
  pow = m.pow,
  win = window,
  doc = document;


// polyfills

var
  Int32Array = Int32Array || Array,
  Uint8Array = Uint8Array || Array;

if (!win.console) {
  win.console = {};
}

var IS_IOS = /iP(ad|hone|od)/g.test(navigator.userAgent);

var requestAnimFrame = (win.requestAnimationFrame && !IS_IOS) ?
  win.requestAnimationFrame : function(callback) {
    callback();
  };



//****** file: Color.js ******

var parseColor = (function() {

  var w3cColors = {
    aliceblue:'#f0f8ff',
    antiquewhite:'#faebd7',
    aqua:'#00ffff',
    aquamarine:'#7fffd4',
    azure:'#f0ffff',
    beige:'#f5f5dc',
    bisque:'#ffe4c4',
    black:'#000000',
    blanchedalmond:'#ffebcd',
    blue:'#0000ff',
    blueviolet:'#8a2be2',
    brown:'#a52a2a',
    burlywood:'#deb887',
    cadetblue:'#5f9ea0',
    chartreuse:'#7fff00',
    chocolate:'#d2691e',
    coral:'#ff7f50',
    cornflowerblue:'#6495ed',
    cornsilk:'#fff8dc',
    crimson:'#dc143c',
    cyan:'#00ffff',
    darkblue:'#00008b',
    darkcyan:'#008b8b',
    darkgoldenrod:'#b8860b',
    darkgray:'#a9a9a9',
    darkgreen:'#006400',
    darkkhaki:'#bdb76b',
    darkmagenta:'#8b008b',
    darkolivegreen:'#556b2f',
    darkorange:'#ff8c00',
    darkorchid:'#9932cc',
    darkred:'#8b0000',
    darksalmon:'#e9967a',
    darkseagreen:'#8fbc8f',
    darkslateblue:'#483d8b',
    darkslategray:'#2f4f4f',
    darkturquoise:'#00ced1',
    darkviolet:'#9400d3',
    deeppink:'#ff1493',
    deepskyblue:'#00bfff',
    dimgray:'#696969',
    dodgerblue:'#1e90ff',
    firebrick:'#b22222',
    floralwhite:'#fffaf0',
    forestgreen:'#228b22',
    fuchsia:'#ff00ff',
    gainsboro:'#dcdcdc',
    ghostwhite:'#f8f8ff',
    gold:'#ffd700',
    goldenrod:'#daa520',
    gray:'#808080',
    green:'#008000',
    greenyellow:'#adff2f',
    honeydew:'#f0fff0',
    hotpink:'#ff69b4',
    indianred :'#cd5c5c',
    indigo :'#4b0082',
    ivory:'#fffff0',
    khaki:'#f0e68c',
    lavender:'#e6e6fa',
    lavenderblush:'#fff0f5',
    lawngreen:'#7cfc00',
    lemonchiffon:'#fffacd',
    lightblue:'#add8e6',
    lightcoral:'#f08080',
    lightcyan:'#e0ffff',
    lightgoldenrodyellow:'#fafad2',
    lightgray:'#d3d3d3',
    lightgreen:'#90ee90',
    lightpink:'#ffb6c1',
    lightsalmon:'#ffa07a',
    lightseagreen:'#20b2aa',
    lightskyblue:'#87cefa',
    lightslategray:'#778899',
    lightsteelblue:'#b0c4de',
    lightyellow:'#ffffe0',
    lime:'#00ff00',
    limegreen:'#32cd32',
    linen:'#faf0e6',
    magenta:'#ff00ff',
    maroon:'#800000',
    mediumaquamarine:'#66cdaa',
    mediumblue:'#0000cd',
    mediumorchid:'#ba55d3',
    mediumpurple:'#9370db',
    mediumseagreen:'#3cb371',
    mediumslateblue:'#7b68ee',
    mediumspringgreen:'#00fa9a',
    mediumturquoise:'#48d1cc',
    mediumvioletred:'#c71585',
    midnightblue:'#191970',
    mintcream:'#f5fffa',
    mistyrose:'#ffe4e1',
    moccasin:'#ffe4b5',
    navajowhite:'#ffdead',
    navy:'#000080',
    oldlace:'#fdf5e6',
    olive:'#808000',
    olivedrab:'#6b8e23',
    orange:'#ffa500',
    orangered:'#ff4500',
    orchid:'#da70d6',
    palegoldenrod:'#eee8aa',
    palegreen:'#98fb98',
    paleturquoise:'#afeeee',
    palevioletred:'#db7093',
    papayawhip:'#ffefd5',
    peachpuff:'#ffdab9',
    peru:'#cd853f',
    pink:'#ffc0cb',
    plum:'#dda0dd',
    powderblue:'#b0e0e6',
    purple:'#800080',
    red:'#ff0000',
    rosybrown:'#bc8f8f',
    royalblue:'#4169e1',
    saddlebrown:'#8b4513',
    salmon:'#fa8072',
    sandybrown:'#f4a460',
    seagreen:'#2e8b57',
    seashell:'#fff5ee',
    sienna:'#a0522d',
    silver:'#c0c0c0',
    skyblue:'#87ceeb',
    slateblue:'#6a5acd',
    slategray:'#708090',
    snow:'#fffafa',
    springgreen:'#00ff7f',
    steelblue:'#4682b4',
    tan:'#d2b48c',
    teal:'#008080',
    thistle:'#d8bfd8',
    tomato:'#ff6347',
    turquoise:'#40e0d0',
    violet:'#ee82ee',
    wheat:'#f5deb3',
    white:'#ffffff',
    whitesmoke:'#f5f5f5',
    yellow:'#ffff00',
    yellowgreen:'#9acd32'
  };

  function hue2rgb(p, q, t) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1/6) return p + (q-p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q-p) * (2/3 - t) * 6;
    return p;
  }

  function limit(v, max) {
    return Math.min(max, Math.max(0, v));
  }

  var Color = function(h, s, l, a) {
    this.H = h;
    this.S = s;
    this.L = l;
    this.A = a;
  };

  var proto = Color.prototype;

  proto.toString = function() {
    var
      h = limit(this.H, 360),
      s = limit(this.S, 1),
      l = limit(this.L, 1),
      a = limit(this.A, 1),
      r, g, b;

    // achromatic
    if (s === 0) {
      r = l;
      g = l;
      b = l;
    } else {
      var
        q = l < 0.5 ? l * (1+s) : l + s - l*s,
        p = 2 * l-q;
        h /= 360;

      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }

    r *= 255;
    g *= 255;
    b *= 255;

    if (a === 1) {
      return '#' + ((1 <<24) + (r <<16) + (g <<8) + b).toString(16).slice(1, 7);
    }
    return 'rgba(' + [Math.round(r), Math.round(g), Math.round(b), a.toFixed(2)].join(',') + ')';
  };

  proto.hue = function(h) {
    return new Color(this.H*h, this.S, this.L, this.A);
  };

  proto.saturation = function(s) {
    return new Color(this.H, this.S*s, this.L, this.A);
  };

  proto.lightness = function(l) {
    return new Color(this.H, this.S, this.L*l, this.A);
  };

  proto.alpha = function(a) {
    return new Color(this.H, this.S, this.L, this.A*a);
  };

  /*
   * str can be in any of these:
   * #0099ff rgb(64, 128, 255) rgba(64, 128, 255, 0.5)
   */
  return function(str) {
    var
      r = 0, g = 0, b = 0, a = 1,
      m;

    str = (''+ str).toLowerCase().replace('grey', 'gray');
    str = w3cColors[str] || str;

    if ((m = str.match(/^#(\w{2})(\w{2})(\w{2})$/))) {
      r = parseInt(m[1], 16);
      g = parseInt(m[2], 16);
      b = parseInt(m[3], 16);
    }

    if ((m = str.match(/rgba?\((\d+)\D+(\d+)\D+(\d+)(\D+([\d.]+))?\)/))) {
      r = parseInt(m[1], 10);
      g = parseInt(m[2], 10);
      b = parseInt(m[3], 10);
      a = m[4] ? parseFloat(m[5]) : 1;
    }

    r /= 255;
    g /= 255;
    b /= 255;

    var
      max = Math.max(r, g, b),
      min = Math.min(r, g, b),
      h, s, l = (max+min) / 2,
      d = max-min;

    if (!d) {
      h = s = 0; // achromatic
    } else {
      s = l > 0.5 ? d / (2-max-min) : d / (max+min);
      switch (max) {
        case r: h = (g-b) / d + (g < b ? 6 : 0); break;
        case g: h = (b-r) / d + 2; break;
        case b: h = (r-g) / d + 4; break;
      }
      h *= 60;
    }

    return new Color(h, s, l, a);
  };

}());


//****** file: SunPosition.js ******

// calculations are based on http://aa.quae.nl/en/reken/zonpositie.html
// code credits to Vladimir Agafonkin (@mourner)

var getSunPosition = (function() {

    var m = Math,
      PI = m.PI,
      sin = m.sin,
      cos = m.cos,
      tan = m.tan,
      asin = m.asin,
      atan = m.atan2;

    var rad = PI/180,
      dayMs = 1000*60*60*24,
      J1970 = 2440588,
      J2000 = 2451545,
      e = rad*23.4397; // obliquity of the Earth

    function toJulian(date) {
      return date.valueOf()/dayMs - 0.5+J1970;
    }
    function toDays(date) {
      return toJulian(date)-J2000;
    }
    function getRightAscension(l, b) {
      return atan(sin(l)*cos(e) - tan(b)*sin(e), cos(l));
    }
    function getDeclination(l, b) {
      return asin(sin(b)*cos(e) + cos(b)*sin(e)*sin(l));
    }
    function getAzimuth(H, phi, dec) {
      return atan(sin(H), cos(H)*sin(phi) - tan(dec)*cos(phi));
    }
    function getAltitude(H, phi, dec) {
      return asin(sin(phi)*sin(dec) + cos(phi)*cos(dec)*cos(H));
    }
    function getSiderealTime(d, lw) {
      return rad * (280.16 + 360.9856235*d) - lw;
    }
    function getSolarMeanAnomaly(d) {
      return rad * (357.5291 + 0.98560028*d);
    }
    function getEquationOfCenter(M) {
      return rad * (1.9148*sin(M) + 0.0200 * sin(2*M) + 0.0003 * sin(3*M));
    }
    function getEclipticLongitude(M, C) {
      var P = rad*102.9372; // perihelion of the Earth
      return M+C+P+PI;
    }

    return function getSunPosition(date, lat, lon) {
      var lw = rad*-lon,
        phi = rad*lat,
        d = toDays(date),
        M = getSolarMeanAnomaly(d),
        C = getEquationOfCenter(M),
        L = getEclipticLongitude(M, C),
        D = getDeclination(L, 0),
        A = getRightAscension(L, 0),
        t = getSiderealTime(d, lw),
        H = t-A;

      return {
        altitude: getAltitude(H, phi, D),
        azimuth: getAzimuth(H, phi, D) - PI/2 // origin: north
      };
    };

}());


//****** file: Import.js ******

var Import = {

  YARD_TO_METER: 0.9144,
  FOOT_TO_METER: 0.3048,
  INCH_TO_METER: 0.0254,
  METERS_PER_LEVEL: 3,

  clockwise: 'CW',
  counterClockwise: 'CCW',

  // detect winding direction: clockwise or counter clockwise
  getWinding: function(points) {
    var x1, y1, x2, y2,
      a = 0,
      i, il;
    for (i = 0, il = points.length-3; i < il; i += 2) {
      x1 = points[i];
      y1 = points[i+1];
      x2 = points[i+2];
      y2 = points[i+3];
      a += x1*y2 - x2*y1;
    }
    return (a/2) > 0 ? this.clockwise : this.counterClockwise;
  },

  // enforce a polygon winding direcetion. Needed for proper backface culling.
  makeWinding: function(points, direction) {
    var winding = this.getWinding(points);
    if (winding === direction) {
      return points;
    }
    var revPoints = [];
    for (var i = points.length-2; i >= 0; i -= 2) {
      revPoints.push(points[i], points[i+1]);
    }
    return revPoints;
  },

  toMeters: function(str) {
    str = '' + str;
    var value = parseFloat(str);
    if (value === str) {
      return value <<0;
    }
    if (~str.indexOf('m')) {
      return value <<0;
    }
    if (~str.indexOf('yd')) {
      return value*this.YARD_TO_METER <<0;
    }
    if (~str.indexOf('ft')) {
      return value*this.FOOT_TO_METER <<0;
    }
    if (~str.indexOf('\'')) {
      var parts = str.split('\'');
      var res = parts[0]*this.FOOT_TO_METER + parts[1]*this.INCH_TO_METER;
      return res <<0;
    }
    return value <<0;
  },

  getRadius: function(points) {
    var minLat = 90, maxLat = -90;
    for (var i = 0, il = points.length; i < il; i += 2) {
      minLat = min(minLat, points[i]);
      maxLat = max(maxLat, points[i]);
    }

    return (maxLat-minLat) / RAD * 6378137 / 2 <<0; // 6378137 = Earth radius
  },

  materialColors: {
    brick:'#cc7755',
    bronze:'#ffeecc',
    canvas:'#fff8f0',
    concrete:'#999999',
    copper:'#a0e0d0',
    glass:'#e8f8f8',
    gold:'#ffcc00',
    plants:'#009933',
    metal:'#aaaaaa',
    panel:'#fff8f0',
    plaster:'#999999',
    roof_tiles:'#f08060',
    silver:'#cccccc',
    slate:'#666666',
    stone:'#996666',
    tar_paper:'#333333',
    wood:'#deb887'
  },

  baseMaterials: {
    asphalt:'tar_paper',
    bitumen:'tar_paper',
    block:'stone',
    bricks:'brick',
    glas:'glass',
    glassfront:'glass',
    grass:'plants',
    masonry:'stone',
    granite:'stone',
    panels:'panel',
    paving_stones:'stone',
    plastered:'plaster',
    rooftiles:'roof_tiles',
    roofingfelt:'tar_paper',
    sandstone:'stone',
    sheet:'canvas',
    sheets:'canvas',
    shingle:'tar_paper',
    shingles:'tar_paper',
    slates:'slate',
    steel:'metal',
    tar:'tar_paper',
    tent:'canvas',
    thatch:'plants',
    tile:'roof_tiles',
    tiles:'roof_tiles'
  },

  // cardboard
  // eternit
  // limestone
  // straw

  getMaterialColor: function(str) {
    str = str.toLowerCase();
    if (str[0] === '#') {
      return str;
    }
    return this.materialColors[this.baseMaterials[str] || str] || null;
  },

  // aligns and cleans up properties in place
  alignProperties: function(prop) {
    var item = {};

    prop = prop || {};

    item.height = this.toMeters(prop.height);
    if (!item.height) {
      if (prop['building:height']) {
        item.height = this.toMeters(prop['building:height']);
      }
      if (prop.levels) {
        item.height = prop.levels*this.METERS_PER_LEVEL <<0;
      }
      if (prop['building:levels']) {
        item.height = prop['building:levels']*this.METERS_PER_LEVEL <<0;
      }
      if (!item.height) {
        item.height = DEFAULT_HEIGHT;
      }
    }

    item.minHeight = this.toMeters(prop.min_height);
    if (!item.min_height) {
      if (prop['building:min_height']) {
        item.minHeight = this.toMeters(prop['building:min_height']);
      }
      if (prop.min_level) {
        item.minHeight = prop.min_level*this.METERS_PER_LEVEL <<0;
      }
      if (prop['building:min_level']) {
        item.minHeight = prop['building:min_level']*this.METERS_PER_LEVEL <<0;
      }
    }

    item.wallColor = prop.wallColor || prop.color;
    if (!item.wallColor) {
      if (prop.color) {
        item.wallColor = prop.color;
      }
      if (prop['building:material']) {
        item.wallColor = this.getMaterialColor(prop['building:material']);
      }
      if (prop['building:facade:material']) {
        item.wallColor = this.getMaterialColor(prop['building:facade:material']);
      }
      if (prop['building:cladding']) {
        item.wallColor = this.getMaterialColor(prop['building:cladding']);
      }
      // wall color
      if (prop['building:color']) {
        item.wallColor = prop['building:color'];
      }
      if (prop['building:colour']) {
        item.wallColor = prop['building:colour'];
      }
    }

    item.roofColor = prop.roofColor;
    if (!item.roofColor) {
      if (prop['roof:material']) {
        item.roofColor = this.getMaterialColor(prop['roof:material']);
      }
      if (prop['building:roof:material']) {
        item.roofColor = this.getMaterialColor(prop['building:roof:material']);
      }
      // roof color
      if (prop['roof:color']) {
        item.roofColor = prop['roof:color'];
      }
      if (prop['roof:colour']) {
        item.roofColor = prop['roof:colour'];
      }
      if (prop['building:roof:color']) {
        item.roofColor = prop['building:roof:color'];
      }
      if (prop['building:roof:colour']) {
        item.roofColor = prop['building:roof:colour'];
      }
    }

    switch (prop['building:shape']) {
      case 'cone':
      case 'cylinder':
        item.shape = prop['building:shape'];
      break;

      case 'dome':
        item.shape = 'dome';
      break;

      case 'sphere':
        item.shape = 'cylinder';
      break;
    }

    if ((prop['roof:shape'] === 'cone' || prop['roof:shape'] === 'dome') && prop['roof:height']) {
      item.shape = 'cylinder';
      item.roofShape = prop['roof:shape'];
      item.roofHeight = this.toMeters(prop['roof:height']);
    }

    if (item.roofHeight) {
      item.height = max(0, item.height-item.roofHeight);
    } else {
      item.roofHeight = 0;
    }

    return item;
  }
};


//****** file: GeoJSON.js ******

var importGeoJSON = (function() {

  function getPolygons(geometry) {
    var
      i, il, j, jl,
      polygon,
      p, lat = 1, lon = 0, alt = 2,
      outer = [], inner = [], height = 0,
      res = [];

    switch (geometry.type) {
      case 'GeometryCollection':
        var sub;
        for (i = 0, il = geometry.geometries.length; i < il; i++) {
          if ((sub = getPolygons(geometry.geometries[i]))) {
            res = res.concat(sub);
          }
        }
        return res;

      case 'Polygon':
        polygon = geometry.coordinates;
      break;

      case 'MultiPolygon':
        polygon = geometry.coordinates[0];
      break;

      default: return res;
    }

    p = polygon[0];
    for (i = 0, il = p.length; i < il; i++) {
      outer.push(p[i][lat], p[i][lon]);
      if (p[i][alt] !== undefined) {
        height += p[i][alt];
      }
    }

    for (i = 0, il = polygon.length-1; i < il; i++) {
      p = polygon[i+1];
      inner[i] = [];
      for (j = 0, jl = p.length; j < jl; j++) {
        inner[i].push(p[j][lat], p[j][lon]);
      }
      inner[i] = Import.makeWinding(inner[i], Import.counterClockwise);
    }

    return [{
      outer: Import.makeWinding(outer, Import.clockwise),
      inner: inner.length ? inner : null,
      height: height / polygon[0].length
    }];
  }

  function clone(obj) {
    var res = {};
    for (var p in obj) {
      if (obj.hasOwnProperty(p)) {
        res[p] = obj[p];
      }
    }
    return res;
  }

  return function(collection, callback) {
    var
      i, il, j, jl,
      res = [],
      feature,
      polygons,
      baseItem, item;

    for (i = 0, il = collection.length; i < il; i++) {
      feature = collection[i];

      if (feature.type !== 'Feature' || callback(feature) === false) {
        continue;
      }

      baseItem = Import.alignProperties(feature.properties);
      polygons = getPolygons(feature.geometry);

      for (j = 0, jl = polygons.length; j < jl; j++) {
        item = clone(baseItem);
        item.footprint = polygons[j].outer;
        if (item.shape === 'cone' || item.shape === 'cylinder') {
          item.radius = Import.getRadius(item.footprint);
        }
        item.holes = polygons[j].inner;
        item.id    = feature.id || feature.properties.id || [item.footprint[0], item.footprint[1], item.height, item.minHeight].join(',');
        res.push(item); // TODO: clone base properties!
      }
    }

    return res;
  };
}());


//****** file: OSMXAPI.js ******

var importOSM = (function() {

  function isBuilding(data) {
    var tags = data.tags;
    return (tags && !tags.landuse &&
      (tags.building || tags['building:part']) && (!tags.layer || tags.layer >= 0));
  }

//  living:'bricks',
//  nonliving:'tar_paper',
//  worship:'copper'

//  function getBuildingType(tags) {
//    if (tags.amenity === 'place_of_worship') {
//      return 'worship';
//    }
//
//    var type = tags.building;
//    if (type === 'yes' || type === 'roof') {
//      type = tags['building:use'];
//    }
//    if (!type) {
//      type = tags.amenity;
//    }
//
//    switch (type) {
//      case 'apartments':
//      case 'house':
//      case 'residential':
//      case 'hut':
//        return 'living';
//      case 'church':
//        return 'worship';
//    }
//
//    return 'nonliving';
//  }

  function getRelationWays(members) {
    var m, outer, inner = [];
    for (var i = 0, il = members.length; i < il; i++) {
      m = members[i];
      if (m.type !== 'way' || !_ways[m.ref]) {
        continue;
      }
      if (!m.role || m.role === 'outer') {
        outer = _ways[m.ref];
        continue;
      }
      if (m.role === 'inner' || m.role === 'enclave') {
        inner.push(_ways[m.ref]);
        continue;
      }
    }

//  if (outer && outer.tags) {
    if (outer) { // allows tags to be attached to relation - instead of outer way
      return { outer:outer, inner:inner };
    }
  }

  function getFootprint(points) {
    if (!points) {
      return;
    }

    var footprint = [], p;
    for (var i = 0, il = points.length; i < il; i++) {
      p = _nodes[ points[i] ];
      footprint.push(p[0], p[1]);
    }

    // do not close polygon yet
    if (footprint[footprint.length-2] !== footprint[0] && footprint[footprint.length-1] !== footprint[1]) {
      footprint.push(footprint[0], footprint[1]);
    }

    // can't span a polygon with just 2 points (+ start & end)
    if (footprint.length < 8) {
      return;
    }

    return footprint;
  }

  function mergeItems(dst, src) {
    for (var p in src) {
      if (src.hasOwnProperty(p)) {
        dst[p] = src[p];
      }
    }
    return dst;
  }

  function filterItem(item, footprint) {
    var res = Import.alignProperties(item.tags);

    if (item.id) {
      res.id = item.id;
    }

    if (footprint) {
      res.footprint = Import.makeWinding(footprint, Import.clockwise);
    }

    if (res.shape === 'cone' || res.shape === 'cylinder') {
      res.radius = Import.getRadius(res.footprint);
    }

    return res;
  }

  function processNode(node) {
    _nodes[node.id] = [node.lat, node.lon];
  }

  function processWay(way) {
    if (isBuilding(way)) {
      var item, footprint;
      if ((footprint = getFootprint(way.nodes)) && _callback(way) !== false) {
        item = filterItem(way, footprint);
        _res.push(item);
      }
      return;
    }

    var tags = way.tags;
    if (!tags || (!tags.highway && !tags.railway && !tags.landuse)) { // TODO: add more filters
      _ways[way.id] = way;
    }
  }

  function processRelation(relation) {
    var relationWays, outerWay, holes = [],
      item, relItem, outerFootprint, innerFootprint;
    if (!isBuilding(relation) ||
      (relation.tags.type !== 'multipolygon' && relation.tags.type !== 'building') ||
      _callback(relation) === false) {
      return;
    }

    if ((relationWays = getRelationWays(relation.members))) {
      relItem = filterItem(relation);
      if ((outerWay = relationWays.outer)) {
        if ((outerFootprint = getFootprint(outerWay.nodes)) && _callback(outerWay) !== false) {
          item = filterItem(outerWay, outerFootprint);
          for (var i = 0, il = relationWays.inner.length; i < il; i++) {
            if ((innerFootprint = getFootprint(relationWays.inner[i].nodes))) {
              holes.push(Import.makeWinding(innerFootprint, Import.counterClockwise));
            }
          }
          if (holes.length) {
            item.holes = holes;
          }
          _res.push(mergeItems(item, relItem));
        }
      }
    }
  }

  var _nodes, _ways, _res, _callback;

  return function(data, callback) {
    _nodes = {};
    _ways = {};
    _res = [];
    _callback = callback;

    var item;
    for (var i = 0, il = data.length; i < il; i++) {
      item = data[i];
      switch(item.type ) {
        case 'node':     processNode(item);     break;
        case 'way':      processWay(item);      break;
        case 'relation': processRelation(item); break;
      }
    }
    return _res;
  };
})();


//****** file: variables.js ******

var VERSION      = '0.1.9a',
  ATTRIBUTION  = '&copy; <a href="http://osmbuildings.org">OSM Buildings</a>',
  OSM_XAPI_URL = 'http://overpass-api.de/api/interpreter?data=[out:json];(way[%22building%22]({s},{w},{n},{e});node(w);way[%22building:part%22=%22yes%22]({s},{w},{n},{e});node(w);relation[%22building%22]({s},{w},{n},{e});way(r);node(w););out;',
//OSM_XAPI_URL = 'http://overpass.osm.rambler.ru/cgi/interpreter?data=[out:json];(way[%22building%22]({s},{w},{n},{e});node(w);way[%22building:part%22=%22yes%22]({s},{w},{n},{e});node(w);relation[%22building%22]({s},{w},{n},{e});way(r);node(w););out;',

  PI         = Math.PI,
  HALF_PI    = PI/2,
  QUARTER_PI = PI/4,
  RAD        = 180/PI,

  MAP_TILE_SIZE  = 256,    // map tile size in pixels
  DATA_TILE_SIZE = 0.0075, // data tile size in geo coordinates, smaller: less data to load but more requests
  ZOOM, MAP_SIZE,

  MIN_ZOOM = 15,

  LAT = 'latitude', LON = 'longitude',

  TRUE = true, FALSE = false,

  WIDTH = 0, HEIGHT = 0,
  CENTER_X = 0, CENTER_Y = 0,
  ORIGIN_X = 0, ORIGIN_Y = 0,

  WALL_COLOR = parseColor('rgba(200, 190, 180)'),
  ALT_COLOR  = WALL_COLOR.lightness(0.8),
  ROOF_COLOR = WALL_COLOR.lightness(1.2),

  WALL_COLOR_STR = ''+ WALL_COLOR,
  ALT_COLOR_STR  = ''+ ALT_COLOR,
  ROOF_COLOR_STR = ''+ ROOF_COLOR,

  METERS_PER_PIXEL = 1,
  ZOOM_FACTOR = 1,

  MAX_HEIGHT, // taller buildings will be cut to this
  DEFAULT_HEIGHT = 5,

  CAM_X, CAM_Y, CAM_Z = 450,

  isZooming;


//****** file: geometry.js ******

function getDistance(p1, p2) {
  var dx = p1.x-p2.x,
    dy = p1.y-p2.y;
  return dx*dx + dy*dy;
}

function getSquareSegmentDistance(px, py, p1x, p1y, p2x, p2y) {
  var dx = p2x-p1x, dy = p2y-p1y,
    t;
  if (dx !== 0 || dy !== 0) {
    t = ((px-p1x) * dx + (py-p1y) * dy) / (dx*dx + dy*dy);
    if (t > 1) {
      p1x = p2x;
      p1y = p2y;
    } else if (t > 0) {
      p1x += dx*t;
      p1y += dy*t;
    }
  }
  dx = px-p1x;
  dy = py-p1y;
  return dx*dx + dy*dy;
}

function simplifyPolygon(buffer) {
  var sqTolerance = 2,
    len = buffer.length/2,
    markers = new Uint8Array(len),

    first = 0, last = len-1,

    i,
    maxSqDist,
    sqDist,
    index,
    firstStack = [], lastStack  = [],
    newBuffer  = [];

  markers[first] = markers[last] = 1;

  while (last) {
    maxSqDist = 0;
    for (i = first+1; i < last; i++) {
      sqDist = getSquareSegmentDistance(
        buffer[i    *2], buffer[i    *2 + 1],
        buffer[first*2], buffer[first*2 + 1],
        buffer[last *2], buffer[last *2 + 1]
      );
      if (sqDist > maxSqDist) {
        index = i;
        maxSqDist = sqDist;
      }
    }

    if (maxSqDist > sqTolerance) {
      markers[index] = 1;

      firstStack.push(first);
      lastStack.push(index);

      firstStack.push(index);
      lastStack.push(last);
    }

    first = firstStack.pop();
    last = lastStack.pop();
  }

  for (i = 0; i < len; i++) {
    if (markers[i]) {
      newBuffer.push(buffer[i*2], buffer[i*2 + 1]);
    }
  }

  return newBuffer;
}

function getCenter(poly) {
  var minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (var i = 0, il = poly.length-3; i < il; i += 2) {
    minX = min(minX, poly[i]);
    maxX = max(maxX, poly[i]);
    minY = min(minY, poly[i+1]);
    maxY = max(maxY, poly[i+1]);
  }
  return { x:minX+(maxX-minX)/2 <<0, y:minY+(maxY-minY)/2 <<0 };
}


//****** file: functions.js ******

function pixelToGeo(x, y) {
  var res = {};
  x /= MAP_SIZE;
  y /= MAP_SIZE;
  res[LAT] = y <= 0  ? 90 : y >= 1 ? -90 : RAD * (2 * atan(exp(PI * (1 - 2*y))) - HALF_PI),
  res[LON] = (x === 1 ?  1 : (x%1 + 1) % 1) * 360 - 180;
  return res;
}

function geoToPixel(lat, lon) {
  var latitude  = min(1, max(0, 0.5 - (log(tan(QUARTER_PI + HALF_PI * lat / 180)) / PI) / 2)),
    longitude = lon/360 + 0.5;
  return {
    x: longitude*MAP_SIZE <<0,
    y: latitude *MAP_SIZE <<0
  };
}

function fromRange(sVal, sMin, sMax, dMin, dMax) {
  sVal = min(max(sVal, sMin), sMax);
  var rel = (sVal-sMin) / (sMax-sMin),
    range = dMax-dMin;
  return min(max(dMin + rel*range, dMin), dMax);
}

function xhr(url, param, callback) {
  url = url.replace(/\{ *([\w_]+) *\}/g, function(tag, key) {
    return param[key] || tag;
  });

  var req = 'XDomainRequest' in win ? new XDomainRequest() : new XMLHttpRequest();

  function changeState(state) {
    if ('XDomainRequest' in win && state !== req.readyState) {
      req.readyState = state;
      if (req.onreadystatechange) {
        req.onreadystatechange();
      }
    }
  }

  req.onerror = function() {
    req.status = 500;
    req.statusText = 'Error';
    changeState(4);
  };

  req.ontimeout = function() {
    req.status = 408;
    req.statusText = 'Timeout';
    changeState(4);
  };

  req.onprogress = function() {
    changeState(3);
  };

  req.onload = function() {
    req.status = 200;
    req.statusText = 'Ok';
    changeState(4);
  };

  req.onreadystatechange = function() {
    if (req.readyState !== 4) {
      return;
    }
    if (!req.status || req.status < 200 || req.status > 299) {
      return;
    }
    if (callback && req.responseText) {
      callback(JSON.parse(req.responseText));
    }
  };

  changeState(0);
  req.open('GET', url);
  changeState(1);
  req.send(null);
  changeState(2);

  return req;
}

function isVisible(polygon) {
   var
    maxX = WIDTH+ORIGIN_X,
    maxY = HEIGHT+ORIGIN_Y;

  // TODO: checking footprint is sufficient for visibility - NOT VALID FOR SHADOWS!
  for (var i = 0, il = polygon.length-3; i < il; i+=2) {
    if (polygon[i] > ORIGIN_X && polygon[i] < maxX && polygon[i+1] > ORIGIN_Y && polygon[i+1] < maxY) {
      return true;
    }
  }
  return false;
}


//****** file: Cache.js ******

var Cache = {

  time: new Date(),
  data: {},

  add: function(data, key) {
    this.data[key] = { data:data, time:Date.now() };
  },

  get: function(key) {
    return this.data[key] && this.data[key].data;
  },

  purge: function() {
    this.time.setMinutes(this.time.getMinutes()-5);
    for (var key in this.data) {
      if (this.data[key].time < this.time) {
        delete this.data[key];
      }
    }
  }
};


//****** file: Data.js ******

var Data = {

  currentItemsIndex: {}, // maintain a list of cached items in order to avoid duplicates on tile borders

  items: [],

  cropDecimals: function(num) {
    return parseFloat(num.toFixed(5));
  },

  getPixelFootprint: function(buffer) {
    var footprint = new Int32Array(buffer.length),
      px;

    for (var i = 0, il = buffer.length-1; i < il; i+=2) {
      px = geoToPixel(buffer[i], buffer[i+1]);
      footprint[i]   = px.x;
      footprint[i+1] = px.y;
    }

    footprint = simplifyPolygon(footprint);
    if (footprint.length < 8) { // 3 points & end==start (*2)
      return;
    }

    return footprint;
  },

  createClosure: function(cacheKey) {
    var self = this;
    return function(data) {
      var parsedData = self.parse(data);
      Cache.add(parsedData, cacheKey);
      self.addRenderItems(parsedData, true);
    };
  },

  parse: function(data) {
    if (!data) {
      return [];
    }
    if (data.type === 'FeatureCollection') {
      return importGeoJSON(data.features, this.each);
    }
    if (data.osm3s) { // OSM Overpass
      return importOSM(data.elements, this.each);
    }
    return [];
  },

  resetItems: function() {
    this.items = [];
    this.currentItemsIndex = {};
  },

  addRenderItems: function(data, allAreNew) {
    var scaledItems = this.scale(data);
    for (var i = 0, il = scaledItems.length; i < il; i++) {
      if (!this.currentItemsIndex[scaledItems[i].id]) {
        scaledItems[i].scale = allAreNew ? 0 : 1;
        this.items.push(scaledItems[i]);
        this.currentItemsIndex[scaledItems[i].id] = 1;
      }
    }
    fadeIn();
  },

  scale: function(items) {
    var i, il, j, jl,
      res = [],
      item,
      height, minHeight, footprint,
      color, wallColor, altColor,
      roofColor, roofHeight,
      holes, innerFootprint,
      zoomScale = 6 / pow(2, ZOOM-MIN_ZOOM); // TODO: consider using HEIGHT / (window.devicePixelRatio || 1)

    for (i = 0, il = items.length; i < il; i++) {
      item = items[i];

      height = item.height / zoomScale;

      minHeight = isNaN(item.minHeight) ? 0 : item.minHeight / zoomScale;
      if (minHeight > MAX_HEIGHT) {
        continue;
      }

      if (!(footprint = this.getPixelFootprint(item.footprint))) {
        continue;
      }

      holes = [];
      if (item.holes) {
        // TODO: simplify
        for (j = 0, jl = item.holes.length; j < jl; j++) {
          if ((innerFootprint = this.getPixelFootprint(item.holes[j]))) {
            holes.push(innerFootprint);
          }
        }
      }

      wallColor = null;
      altColor  = null;
      if (item.wallColor) {
        if ((color = parseColor(item.wallColor))) {
          wallColor = color.alpha(ZOOM_FACTOR);
          altColor  = ''+ wallColor.lightness(0.8);
          wallColor = ''+ wallColor;
        }
      }

      roofColor = null;
      if (item.roofColor) {
        if ((color = parseColor(item.roofColor))) {
          roofColor = ''+ color.alpha(ZOOM_FACTOR);
        }
      }

      roofHeight = item.roofHeight / zoomScale;

      if (height <= minHeight && roofHeight <= 0) {
        continue;
      }

      res.push({
        id:         item.id,
        footprint:  footprint,
        height:     min(height, MAX_HEIGHT),
        minHeight:  minHeight,
        wallColor:  wallColor,
        altColor:   altColor,
        roofColor:  roofColor,
        roofShape:  item.roofShape,
        roofHeight: roofHeight,
        center:     getCenter(footprint),
        holes:      holes.length ? holes : null,
        shape:      item.shape, // TODO: drop footprint
        radius:     item.radius/METERS_PER_PIXEL
      });
    }

    return res;
  },

  set: function(data) {
    this.isStatic = true;
    this.resetItems();
    this.addRenderItems(this.staticData = this.parse(data), true);
  },

  load: function(url) {
    this.url = url || OSM_XAPI_URL;
    this.isStatic = !/(.+\{[nesw]\}){4,}/.test(this.url);

    if (this.isStatic) {
      this.resetItems();
      xhr(this.url, {}, function(data) {
        this.addRenderItems(this.staticData = this.parse(data), true);
      });
      return;
    }

    this.update();
  },

  update: function() {
    this.resetItems();

    if (ZOOM < MIN_ZOOM) {
      return;
    }

    if (this.isStatic) {
      this.addRenderItems(this.staticData);
      return;
    }

    if (!this.url) {
      return;
    }

    var lat, lon,
      parsedData, cacheKey,
      nw = pixelToGeo(ORIGIN_X,       ORIGIN_Y),
      se = pixelToGeo(ORIGIN_X+WIDTH, ORIGIN_Y+HEIGHT),
      sizeLat = DATA_TILE_SIZE,
      sizeLon = DATA_TILE_SIZE*2;

    var bounds = {
      n: ceil( nw.latitude /sizeLat) * sizeLat,
      e: ceil( se.longitude/sizeLon) * sizeLon,
      s: floor(se.latitude /sizeLat) * sizeLat,
      w: floor(nw.longitude/sizeLon) * sizeLon
    };

    for (lat = bounds.s; lat <= bounds.n; lat += sizeLat) {
      for (lon = bounds.w; lon <= bounds.e; lon += sizeLon) {
        lat = this.cropDecimals(lat);
        lon = this.cropDecimals(lon);

        cacheKey = lat +','+ lon;
        if ((parsedData = Cache.get(cacheKey))) {
          this.addRenderItems(parsedData);
        } else {
          xhr(this.url, {
            n: this.cropDecimals(lat+sizeLat),
            e: this.cropDecimals(lon+sizeLon),
            s: lat,
            w: lon
          }, this.createClosure(cacheKey));
        }
      }
    }

    Cache.purge();
  },

  each: function() {}

};


//****** file: Block.js ******

var Block = {

  draw: function(context, polygon, innerPolygons, height, minHeight, color, altColor, roofColor) {
    var
      i, il,
      roof = this._extrude(context, polygon, height, minHeight, color, altColor),
      innerRoofs = [];

    if (innerPolygons) {
      for (i = 0, il = innerPolygons.length; i < il; i++) {
        innerRoofs[i] = this._extrude(context, innerPolygons[i], height, minHeight, color, altColor);
      }
    }

    context.fillStyle = roofColor;

    context.beginPath();
    this._ring(context, roof);
    if (innerPolygons) {
      for (i = 0, il = innerRoofs.length; i < il; i++) {
        this._ring(context, innerRoofs[i]);
      }
    }
    context.closePath();
    context.stroke();
    context.fill();
  },

  _extrude: function(context, polygon, height, minHeight, color, altColor) {
    var
      scale = CAM_Z / (CAM_Z-height),
      minScale = CAM_Z / (CAM_Z-minHeight),
      a = { x:0, y:0 },
      b = { x:0, y:0 },
      _a, _b,
      roof = [];

    for (var i = 0, il = polygon.length-3; i < il; i += 2) {
      a.x = polygon[i  ]-ORIGIN_X;
      a.y = polygon[i+1]-ORIGIN_Y;
      b.x = polygon[i+2]-ORIGIN_X;
      b.y = polygon[i+3]-ORIGIN_Y;

      // project 3d to 2d on extruded footprint
      _a = Buildings.project(a, scale);
      _b = Buildings.project(b, scale);

      if (minHeight) {
        a = Buildings.project(a, minScale);
        b = Buildings.project(b, minScale);
      }

      // backface culling check
      if ((b.x-a.x) * (_a.y-a.y) > (_a.x-a.x) * (b.y-a.y)) {
        // depending on direction, set wall shading
        if ((a.x < b.x && a.y < b.y) || (a.x > b.x && a.y > b.y)) {
          context.fillStyle = altColor;
        } else {
          context.fillStyle = color;
        }

        context.beginPath();
        this._ring(context, [
           b.x,  b.y,
           a.x,  a.y,
          _a.x, _a.y,
          _b.x, _b.y
        ]);
        context.closePath();
        context.fill();
      }

      roof[i]   = _a.x;
      roof[i+1] = _a.y;
    }

    return roof;
  },

  _ring: function(context, polygon) {
    context.moveTo(polygon[0], polygon[1]);
    for (var i = 2, il = polygon.length-1; i < il; i += 2) {
      context.lineTo(polygon[i], polygon[i+1]);
    }
  },

  polygon: function(context, polygon, innerPolygons) {
    context.beginPath();
    this.ring(context, polygon);
    if (innerPolygons) {
      for (var i = 0, il = innerPolygons.length; i < il; i++) {
        this.ring(context, innerPolygons[i]);
      }
    }
    context.closePath();
    context.stroke();
    context.fill();
  },

  ring: function(context, polygon) {
    context.moveTo(polygon[0]-ORIGIN_X, polygon[1]-ORIGIN_Y);
    for (var i = 2, il = polygon.length-1; i < il; i += 2) {
      context.lineTo(polygon[i]-ORIGIN_X, polygon[i+1]-ORIGIN_Y);
    }
  },

  shadow: function(context, polygon, innerPolygons, height, minHeight) {
    var
      mode = null,
      a = { x:0, y:0 },
      b = { x:0, y:0 },
      _a, _b;

    for (var i = 0, il = polygon.length-3; i < il; i += 2) {
      a.x = polygon[i  ]-ORIGIN_X;
      a.y = polygon[i+1]-ORIGIN_Y;
      b.x = polygon[i+2]-ORIGIN_X;
      b.y = polygon[i+3]-ORIGIN_Y;

      _a = Shadows.project(a, height);
      _b = Shadows.project(b, height);

      if (minHeight) {
        a = Shadows.project(a, minHeight);
        b = Shadows.project(b, minHeight);
      }

      // mode 0: floor edges, mode 1: roof edges
      if ((b.x-a.x) * (_a.y-a.y) > (_a.x-a.x) * (b.y-a.y)) {
        if (mode === 1) {
          context.lineTo(a.x, a.y);
        }
        mode = 0;
        if (!i) {
          context.moveTo(a.x, a.y);
        }
        context.lineTo(b.x, b.y);
      } else {
        if (mode === 0) {
          context.lineTo(_a.x, _a.y);
        }
        mode = 1;
        if (!i) {
          context.moveTo(_a.x, _a.y);
        }
        context.lineTo(_b.x, _b.y);
      }
    }

    if (innerPolygons) {
      for (i = 0, il = innerPolygons.length; i < il; i++) {
        this.ring(context, innerPolygons[i]);
      }
    }
  },

  mask: function(context, polygon, innerPolygons) {
    this.ring(context, polygon);
    if (innerPolygons) {
      for (var i = 0, il = innerPolygons.length; i < il; i++) {
        this.ring(context, innerPolygons[i]);
      }
    }
  }
};


//****** file: Cylinder.js ******

var Cylinder = {

  draw: function(context, center, radius, topRadius, height, minHeight, color, altColor, roofColor) {
    var
      c = { x:center.x-ORIGIN_X, y:center.y-ORIGIN_Y },
      scale = CAM_Z / (CAM_Z-height),
      apex = Buildings.project(c, scale),
      a1, a2;

    topRadius *= scale;

    if (minHeight) {
      scale = CAM_Z / (CAM_Z-minHeight);
      c = Buildings.project(c, scale);
      radius = radius*scale;
    }

    // common tangents for ground and roof circle
    var tangents = this._tangents(c, radius, apex, topRadius);

    // no tangents? top circle is inside bottom circle
    if (!tangents) {
      a1 = 1.5*PI;
      a2 = 1.5*PI;
    } else {
      a1 = atan2(tangents[0].y1-c.y, tangents[0].x1-c.x);
      a2 = atan2(tangents[1].y1-c.y, tangents[1].x1-c.x);
    }

    context.fillStyle = color;
    context.beginPath();
    context.arc(apex.x, apex.y, topRadius, HALF_PI, a1, true);
    context.arc(c.x, c.y, radius, a1, HALF_PI);
    context.closePath();
    context.fill();

    context.fillStyle = altColor;
    context.beginPath();
    context.arc(apex.x, apex.y, topRadius, a2, HALF_PI, true);
    context.arc(c.x, c.y, radius, HALF_PI, a2);
    context.closePath();
    context.fill();

    context.fillStyle = roofColor;
    this._circle(context, apex, topRadius);
  },

  _circle: function(context, center, radius) {
    context.beginPath();
    context.arc(center.x, center.y, radius, 0, PI*2);
    context.stroke();
    context.fill();
  },

  circle: function(context, center, radius) {
    this._circle(context, { x:center.x-ORIGIN_X, y:center.y-ORIGIN_Y }, radius);
  },

  shadow: function(context, center, radius, topRadius, height, minHeight) {
    var
      c = { x:center.x-ORIGIN_X, y:center.y-ORIGIN_Y },
      apex = Shadows.project(c, height),
      p1, p2;

    if (minHeight) {
      c = Shadows.project(c, minHeight);
    }

    // common tangents for ground and roof circle
    var tangents = this._tangents(c, radius, apex, topRadius);

    // TODO: no tangents? roof overlaps everything near cam position
    if (tangents) {
      p1 = atan2(tangents[0].y1-c.y, tangents[0].x1-c.x);
      p2 = atan2(tangents[1].y1-c.y, tangents[1].x1-c.x);
      context.moveTo(tangents[1].x2, tangents[1].y2);
      context.arc(apex.x, apex.y, topRadius, p2, p1);
      context.arc(c.x, c.y, radius, p1, p2);
    } else {
      context.moveTo(c.x+radius, c.y);
      context.arc(c.x, c.y, radius, 0, 2*PI);
    }
  },

  mask: function(context, center, radius) {
    var c = { x:center.x-ORIGIN_X, y:center.y-ORIGIN_Y };
    context.moveTo(c.x+radius, c.y);
    context.arc(c.x, c.y, radius, 0, PI*2);
  },

  // http://en.wikibooks.org/wiki/Algorithm_Implementation/Geometry/Tangents_between_two_circles
  _tangents: function(c1, r1, c2, r2) {
    var
      dx = c1.x-c2.x,
      dy = c1.y-c2.y,
      dr = r1-r2,
      sqdist = (dx*dx) + (dy*dy);

    if (sqdist <= dr*dr) {
      return;
    }

    var dist = sqrt(sqdist),
      vx = -dx/dist,
      vy = -dy/dist,
      c  =  dr/dist,
      res = [],
      h, nx, ny;

    // Let A, B be the centers, and C, D be points at which the tangent
    // touches first and second circle, and n be the normal vector to it.
    //
    // We have the system:
    //   n * n = 1    (n is a unit vector)
    //   C = A + r1 * n
    //   D = B + r2 * n
    //   n * CD = 0   (common orthogonality)
    //
    // n * CD = n * (AB + r2*n - r1*n) = AB*n - (r1 -/+ r2) = 0,  <=>
    // AB * n = (r1 -/+ r2), <=>
    // v * n = (r1 -/+ r2) / d,  where v = AB/|AB| = AB/d
    // This is a linear equation in unknown vector n.
    // Now we're just intersecting a line with a circle: v*n=c, n*n=1

    h = sqrt(max(0, 1 - c*c));
    for (var sign = 1; sign >= -1; sign -= 2) {
      nx = vx*c - sign*h*vy;
      ny = vy*c + sign*h*vx;
      res.push({
        x1: c1.x + r1*nx <<0,
        y1: c1.y + r1*ny <<0,
        x2: c2.x + r2*nx <<0,
        y2: c2.y + r2*ny <<0
      });
    }

    return res;
  }
};


//****** file: Debug.js ******

var Debug = {

  point: function(context, x, y, color, size) {
    context.fillStyle = color || '#ffcc00';
    context.beginPath();
    context.arc(x, y, size || 3, 0, 2*PI);
    context.closePath();
    context.fill();
  },

  line: function(context, ax, ay, bx, by, color) {
    context.strokeStyle = color || '#ffcc00';
    context.beginPath();
    context.moveTo(ax, ay);
    context.lineTo(bx, by);
    context.closePath();
    context.stroke();
  }
};


//****** file: Buildings.js ******

var Buildings = {

  project: function(p, m) {
    return {
      x: (p.x-CAM_X) * m + CAM_X <<0,
      y: (p.y-CAM_Y) * m + CAM_Y <<0
    };
  },

  render: function() {
    var context = this.context;
    context.clearRect(0, 0, WIDTH, HEIGHT);

    // show on high zoom levels only and avoid rendering during zoom
    if (ZOOM < MIN_ZOOM || isZooming) {
      return;
    }

    var
      item,
      h, mh,
      sortCam = { x:CAM_X+ORIGIN_X, y:CAM_Y+ORIGIN_Y },
      footprint,
      wallColor, altColor, roofColor,
      dataItems = Data.items,
      center, radius;

    dataItems.sort(function(a, b) {
      return (a.minHeight-b.minHeight) || getDistance(b.center, sortCam) - getDistance(a.center, sortCam) || (b.height-a.height);
    });

    for (var i = 0, il = dataItems.length; i < il; i++) {
      item = dataItems[i];

      if (Simplified.isSimple(item)) {
        continue;
      }

      footprint = item.footprint;

      if (!isVisible(footprint)) {
        continue;
      }

      // when fading in, use a dynamic height
      h = item.scale < 1 ? item.height*item.scale : item.height;

      mh = 0;
      if (item.minHeight) {
        mh = item.scale < 1 ? item.minHeight*item.scale : item.minHeight;
      }

      wallColor = item.wallColor || WALL_COLOR_STR;
      altColor  = item.altColor  || ALT_COLOR_STR;
      roofColor = item.roofColor || ROOF_COLOR_STR;
      context.strokeStyle = altColor;

      switch (item.shape) {
        case 'cylinder':
          center = item.center;
          radius = item.radius;
          Cylinder.draw(context, center, radius, radius, h, mh, wallColor, altColor, roofColor);
          if (item.roofShape === 'cone') {
            Cylinder.draw(context, center, radius, 0, h+item.roofHeight, h, roofColor, ''+ parseColor(roofColor).lightness(0.9));
          }
          if (item.roofShape === 'dome') {
            Cylinder.draw(context, center, radius, radius/2, h+item.roofHeight, h, roofColor, ''+ parseColor(roofColor).lightness(0.9));
          }
        break;

        case 'cone':
          Cylinder.draw(context, item.center, item.radius, 0, h, mh, wallColor, altColor);
        break;

        case 'dome':
          Cylinder.draw(context, item.center, item.radius, item.radius/2, h, mh, wallColor, altColor);
        break;

        default:
          Block.draw(context, footprint, item.holes, h, mh, wallColor, altColor, roofColor);
      }
    }
  }
};


//****** file: Simplified.js ******

var Simplified = {

  maxZoom: MIN_ZOOM+2,
  maxHeight: 5,

  isSimple: function(item) {
    return (ZOOM <= this.maxZoom && item.height+item.roofHeight < this.maxHeight);
  },

  render: function() {
    var context = this.context;
    context.clearRect(0, 0, WIDTH, HEIGHT);

    // show on high zoom levels only and avoid rendering during zoom
    if (ZOOM < MIN_ZOOM || isZooming || ZOOM > this.maxZoom) {
      return;
    }

    var
      item,
      footprint,
      dataItems = Data.items;

    for (var i = 0, il = dataItems.length; i < il; i++) {
      item = dataItems[i];

      if (item.height >= this.maxHeight) {
        continue;
      }

      footprint = item.footprint;

      if (!isVisible(footprint)) {
        continue;
      }

      context.strokeStyle = item.altColor  || ALT_COLOR_STR;
      context.fillStyle   = item.roofColor || ROOF_COLOR_STR;

      if (item.shape === 'cylinder' || item.shape === 'cone' || item.shape === 'dome') {
        Cylinder.circle(context, item.center, item.radius);
      } else {
        Block.polygon(context, footprint, item.holes);
      }
    }
  }
};


//****** file: Shadows.js ******

var Shadows = {

  enabled: true,
  color: '#666666',
  blurColor: '#000000',
  blurSize: 15,
  date: new Date(),
  direction: { x:0, y:0 },

  project: function(p, h) {
    return {
      x: p.x + this.direction.x*h,
      y: p.y + this.direction.y*h
    };
  },

  render: function() {
    var
      context = this.context,
      screenCenter, sun, length, alpha;

    context.clearRect(0, 0, WIDTH, HEIGHT);

    // show on high zoom levels only and avoid rendering during zoom
    if (!this.enabled || ZOOM < MIN_ZOOM || isZooming) {
      return;
    }

    // TODO: calculate this just on demand
    screenCenter = pixelToGeo(CENTER_X+ORIGIN_X, CENTER_Y+ORIGIN_Y);
    sun = getSunPosition(this.date, screenCenter.latitude, screenCenter.longitude);

    if (sun.altitude <= 0) {
      return;
    }

    length = 1 / tan(sun.altitude);
    alpha = length < 5 ? 0.75 : 1/length*5;

    this.direction.x = cos(sun.azimuth) * length;
    this.direction.y = sin(sun.azimuth) * length;

    var
      i, il,
      item,
      h, mh,
      footprint,
      dataItems = Data.items,
      center, radius;

    context.canvas.style.opacity = alpha / (ZOOM_FACTOR * 2);
    context.shadowColor = this.blurColor;
    context.shadowBlur = this.blurSize * (ZOOM_FACTOR / 2);
    context.fillStyle = this.color;
    context.beginPath();

    for (i = 0, il = dataItems.length; i < il; i++) {
      item = dataItems[i];

      footprint = item.footprint;

      if (!isVisible(footprint)) {
        continue;
      }

      // when fading in, use a dynamic height
      h = item.scale < 1 ? item.height*item.scale : item.height;

      mh = 0;
      if (item.minHeight) {
        mh = item.scale < 1 ? item.minHeight*item.scale : item.minHeight;
      }

      switch (item.shape) {
        case 'cylinder':
          center = item.center;
          radius = item.radius;
          Cylinder.shadow(context, center, radius, radius, h, mh);
          if (item.roofShape === 'cone') {
            Cylinder.shadow(context, center, radius, 0, h+item.roofHeight, h);
          }
          if (item.roofShape === 'dome') {
            Cylinder.shadow(context, center, radius, radius/2, h+item.roofHeight, h);
          }
        break;
        case 'cone':
          Cylinder.shadow(context, item.center, item.radius, 0, h, mh);
        break;
        case 'dome':
          Cylinder.shadow(context, item.center, item.radius, item.radius/2, h, mh);
        break;
        default:
          Block.shadow(context, footprint, item.holes, h, mh);
      }
    }

    context.closePath();
    context.fill();

    context.shadowBlur = null;

    // now draw all the footprints as negative clipping mask
    context.globalCompositeOperation = 'destination-out';
    context.beginPath();

    for (i = 0, il = dataItems.length; i < il; i++) {
      item = dataItems[i];

      footprint = item.footprint;

      if (!isVisible(footprint)) {
        continue;
      }

      // if object is hovered, there is no need to clip it's footprint
      if (item.minHeight) {
        continue;
      }

      switch (item.shape) {
        case 'cylinder':
        case 'cone':
        case 'dome':
          Cylinder.mask(context, item.center, item.radius);
        break;
        default:
          Block.mask(context, footprint, item.holes);
      }
    }

    context.fillStyle = '#00ff00';
    context.fill();
    context.globalCompositeOperation = 'source-over';
  }
};


//****** file: Layers.js ******

var animTimer;

function fadeIn() {
  if (animTimer) {
    return;
  }

  animTimer = setInterval(function() {
    var dataItems = Data.items,
      isNeeded = false;

    for (var i = 0, il = dataItems.length; i < il; i++) {
      if (dataItems[i].scale < 1) {
        dataItems[i].scale += 0.5*0.2; // amount*easing
        if (dataItems[i].scale > 1) {
          dataItems[i].scale = 1;
        }
        isNeeded = true;
      }
    }

    Layers.render();

    if (!isNeeded) {
      clearInterval(animTimer);
      animTimer = null;
    }
  }, 33);
}

var Layers = {

  container: doc.createElement('DIV'),
  items: [],

  init: function() {
    this.container.style.pointerEvents = 'none';
    this.container.style.position = 'absolute';
    this.container.style.left = 0;
    this.container.style.top  = 0;

    // TODO: improve this to createContext(Layer) => layer.setContext(context)
    Shadows.context    = this.createContext();
    Simplified.context = this.createContext();
    Buildings.context  = this.createContext();
  },

  render: function(quick) {
    requestAnimFrame(function() {
      if (!quick) {
        Shadows.render();
        Simplified.render();
      }
      Buildings.render();
    });
  },

  createContext: function() {
    var canvas = doc.createElement('CANVAS');
    canvas.style.webkitTransform = 'translate3d(0,0,0)'; // turn on hw acceleration
    canvas.style.imageRendering  = 'optimizeSpeed';
    canvas.style.position = 'absolute';
    canvas.style.left = 0;
    canvas.style.top  = 0;

    var context = canvas.getContext('2d');
    context.lineCap   = 'round';
    context.lineJoin  = 'round';
    context.lineWidth = 1;

    context.mozImageSmoothingEnabled    = false;
    context.webkitImageSmoothingEnabled = false;

    this.items.push(canvas);
    this.container.appendChild(canvas);

    return context;
  },

  appendTo: function(parentNode) {
    parentNode.appendChild(this.container);
  },

  remove: function() {
    this.container.parentNode.removeChild(this.container);
  },

  setSize: function(width, height) {
    for (var i = 0, il = this.items.length; i < il; i++) {
      this.items[i].width  = width;
      this.items[i].height = height;
    }
  },

  screenshot: function() {
    var
      canvas = doc.createElement('CANVAS'),
      context = canvas.getContext('2d'),
      i, il,
      item;

    canvas.width  = WIDTH;
    canvas.height = HEIGHT;

    // end fade in
    clearInterval(animTimer);
    animTimer = null;

    var dataItems = Data.items;
    for (i = 0, il = dataItems.length; i < il; i++) {
      dataItems[i].scale = 1;
    }

    this.render(true);

    for (i = 0, il = this.items.length; i < il; i++) {
      item = this.items[i];
      if (item.style.opacity !== '') {
        context.globalAlpha = parseFloat(item.style.opacity);
      }
      context.drawImage(item, 0, 0);
      context.globalAlpha = 1;
    }

    return canvas.toDataURL('image/png');
  },

  // usually called after move: container jumps by move delta, cam is reset
  setPosition: function(x, y) {
    this.container.style.left = x +'px';
    this.container.style.top  = y +'px';
  }
};

Layers.init();


//****** file: adapter.js ******

function setOrigin(origin) {
  ORIGIN_X = origin.x;
  ORIGIN_Y = origin.y;
}

function moveCam(offset) {
  CAM_X = CENTER_X + offset.x;
  CAM_Y = HEIGHT   + offset.y;
  Layers.render(true);
}

function setSize(size) {
  WIDTH  = size.w;
  HEIGHT = size.h;
  CENTER_X = WIDTH /2 <<0;
  CENTER_Y = HEIGHT/2 <<0;

  CAM_X = CENTER_X;
  CAM_Y = HEIGHT;

  Layers.setSize(WIDTH, HEIGHT);
  MAX_HEIGHT = CAM_Z-50;
}

function setZoom(z) {
  ZOOM = z;
  MAP_SIZE = MAP_TILE_SIZE <<ZOOM;

  var pxCenter = pixelToGeo(ORIGIN_X+CENTER_X, ORIGIN_Y+CENTER_Y);
  // see http://wiki.openstreetmap.org/wiki/Zoom_levels
  METERS_PER_PIXEL = Math.abs(40075040 * cos(pxCenter.latitude) / pow(2, ZOOM+8));

  ZOOM_FACTOR = pow(0.95, ZOOM-MIN_ZOOM);

  WALL_COLOR_STR = ''+ WALL_COLOR.alpha(ZOOM_FACTOR);
  ALT_COLOR_STR  = ''+ ALT_COLOR.alpha( ZOOM_FACTOR);
  ROOF_COLOR_STR = ''+ ROOF_COLOR.alpha(ZOOM_FACTOR);
}

function onResize(e) {
  setSize(e.width, e.height);
  Layers.render();
  Data.update();
}

function onMoveEnd(e) {
  Layers.render();
  Data.update(); // => fadeIn() => Layers.render()
}

function onZoomStart() {
  isZooming = true;
// effectively clears because of isZooming flag
// TODO: introduce explicit clear()
  Layers.render();
}

function onZoomEnd(e) {
  isZooming = false;
  setZoom(e.zoom);
  Data.update(); // => fadeIn()
  Layers.render();
}

if (win.DeviceMotionEvent) {
  var
    devMotionTime = new Date().getTime(),
    devMotionPos = { x:0, y:0 },
    motionFilterFactor = 0.5;

	win.addEventListener('devicemotion', function(e) {
		var t, now = new Date().getTime();

    if (now < devMotionTime + 33) {
      return;
    }

		if ((e = e.accelerationIncludingGravity || e.acceleration)) {
      switch (win.orientation) {
        case  -90: t = e.x; e.x =  e.y; e.y = -t; break;
        case   90: t = e.x; e.x = -e.y; e.y =  t; break;
        case -180: e.x *= -1; e.y *= -1; break;
      }

      devMotionTime = now;
      CAM_X -= devMotionPos.x;
      CAM_Y -= devMotionPos.y;

      // http://stackoverflow.com/questions/6942626/accelerometer-low-pass-filtering
      devMotionPos.x = (e.x * -50 * motionFilterFactor) + (devMotionPos.x * (1.0-motionFilterFactor));
      devMotionPos.y = (e.y *  50 * motionFilterFactor) + (devMotionPos.y * (1.0-motionFilterFactor));

      CAM_X += devMotionPos.x;
      CAM_Y += devMotionPos.y;

      Layers.render(true);
    }
  });
}


//****** file: Leaflet.js ******

var osmb = function(map) {
    this.offset = { x:0, y:0 };
    map.addLayer(this);
};

var proto = osmb.prototype;

proto.onAdd = function(map) {
    this.map = map;
    Layers.appendTo(map._panes.overlayPane);

    var off = this.getOffset(),
        po = map.getPixelOrigin();
    setSize({ w:map._size.x, h:map._size.y });
    setOrigin({ x:po.x-off.x, y:po.y-off.y });
    setZoom(map._zoom);

    Layers.setPosition(-off.x, -off.y);

    map.on({
        move:      this.onMove,
        moveend:   this.onMoveEnd,
        zoomstart: this.onZoomStart,
        zoomend:   this.onZoomEnd,
        resize:    this.onResize,
        viewreset: this.onViewReset
    }, this);

    if (map.options.zoomAnimation) {
        map.on('zoomanim', this.onZoom, this);
    }

    if (map.attributionControl) {
        map.attributionControl.addAttribution(ATTRIBUTION);
    }

    Data.update();
};

proto.onRemove = function() {
    var map = this.map;
    if (map.attributionControl) {
        map.attributionControl.removeAttribution(ATTRIBUTION);
    }

    map.off({
        move:      this.onMove,
        moveend:   this.onMoveEnd,
        zoomstart: this.onZoomStart,
        zoomend:   this.onZoomEnd,
        resize:    this.onResize,
        viewreset: this.onViewReset
    }, this);

    if (map.options.zoomAnimation) {
        map.off('zoomanim', this.onZoom, this);
    }
    Layers.remove();
    map = null;
};

proto.onMove = function(e) {
    var off = this.getOffset();
    moveCam({ x:this.offset.x-off.x, y:this.offset.y-off.y });
};

proto.onMoveEnd = function(e) {
    if (this.skipMoveEnd) { // moveend is also fired after zoom
        this.skipMoveEnd = false;
        return;
    }
    var map = this.map,
        off = this.getOffset(),
        po = map.getPixelOrigin();

    this.offset = off;
    Layers.setPosition(-off.x, -off.y);
    moveCam({ x:0, y:0 });

    setSize({ w:map._size.x, h:map._size.y }); // in case this is triggered by resize
    setOrigin({ x:po.x-off.x, y:po.y-off.y });
    onMoveEnd(e);
};

proto.onZoomStart = function(e) {
    onZoomStart(e);
};

proto.onZoom = function(e) {
//    var map = this.map,
//        scale = map.getZoomScale(e.zoom),
//        offset = map._getCenterOffset(e.center).divideBy(1 - 1/scale),
//        viewportPos = map.containerPointToLayerPoint(map.getSize().multiplyBy(-1)),
//        origin = viewportPos.add(offset).round();
//
//    this.container.style[L.DomUtil.TRANSFORM] = L.DomUtil.getTranslateString((origin.multiplyBy(-1).add(this.getOffset().multiplyBy(-1)).multiplyBy(scale).add(origin))) + ' scale(' + scale + ') ';
//    isZooming = true;
};

proto.onZoomEnd = function(e) {
    var map = this.map,
        off = this.getOffset(),
        po = map.getPixelOrigin();

    setOrigin({ x:po.x-off.x, y:po.y-off.y });
    onZoomEnd({ zoom:map._zoom });
    this.skipMoveEnd = true;
};

proto.onResize = function() {
};

proto.onViewReset = function() {
    var off = this.getOffset();

    this.offset = off;
    Layers.setPosition(-off.x, -off.y);
    moveCam({ x:0, y:0 });
};

proto.getOffset = function() {
    return L.DomUtil.getPosition(this.map._mapPane);
};


//****** file: public.js ******


proto.setStyle = function(style) {
  style = style || {};
  var color;
  if ((color = style.color || style.wallColor)) {
    WALL_COLOR = parseColor(color);
    WALL_COLOR_STR = ''+ WALL_COLOR.alpha(ZOOM_FACTOR);

    ALT_COLOR = WALL_COLOR.lightness(0.8);
    ALT_COLOR_STR  = ''+ ALT_COLOR.alpha(ZOOM_FACTOR);

    ROOF_COLOR = WALL_COLOR.lightness(1.2);
    ROOF_COLOR_STR = ''+ ROOF_COLOR.alpha(ZOOM_FACTOR);
  }

  if (style.roofColor) {
    ROOF_COLOR = parseColor(style.roofColor);
    ROOF_COLOR_STR = ''+ ROOF_COLOR.alpha(ZOOM_FACTOR);
  }

  if (style.shadows !== undefined) {
    Shadows.enabled = !!style.shadows;
  }

  Layers.render();

  return this;
};

proto.setDate = function(date) {
  Shadows.date = date;
  Shadows.render();
  return this;
};

proto.loadData = function(url) {
  Data.load(url);
  return this;
};

proto.setData = function(data) {
  Data.set(data);
  return this;
};

proto.each = function(handler, scope) {
  Data.each = function(feature) {
    return handler.call(scope, feature);
  };
  return this;
};

proto.screenshot = function(forceDownload) {
  var dataURL = Layers.screenshot();
  if (forceDownload) {
    win.location.href = dataURL.replace('image/png', 'image/octet-stream');
  }
  return dataURL;
};

osmb.VERSION     = VERSION;
osmb.ATTRIBUTION = ATTRIBUTION;


//****** file: suffix.js ******


  return osmb;
}());


