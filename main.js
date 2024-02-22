/**
 * 单词本插件
 */

function buildResult(res) {
  var result = {
    "from": "en",
    "to": "zh-Hans",
    "toParagraphs": [res],
    "fromParagraphs": [
      "success add to word book"
    ]
  }
  return result;
}

function buildError(res) {
  var result = {
    'type': 'param',
    'message': res,
    'addtion': '无'
  }
  return result;
}

// override
function supportLanguages() {
  return ['auto', 'zh-Hans', 'en'];
}

// override
function translate(query, completion) {
  var text = query.text;
  var exists = $file.exists('$sandbox/demo.txt');
  if (exists) {
    var fileData = $file.read('$sandbox/demo.txt');
    fileData = fileData.toUTF8();
    fileData += "\n" + text;
    $file.write({
      data: $data.fromUTF8(fileData),
      path: "$sandbox/demo.txt"
    })
    completion({ 'result': buildResult("exists") });
  } else {
    $file.write({
      data: $data.fromUTF8(text),
      path: "$sandbox/demo.txt"
    })
    completion({ 'result': buildResult('not exists') });
  }
}
