function downloadBlob(data, fileName, mimeType) {
    var blob, url;
    blob = new Blob([data], {
        type: mimeType
    });
    url = window.URL.createObjectURL(blob);
    downloadURL(url, fileName);
    setTimeout(function() {
        return window.URL.revokeObjectURL(url);
    }, 1000);
}

function downloadURL(data, fileName) {
    var a;
    a = document.createElement('a');
    a.href = data;
    a.download = fileName;
    document.body.appendChild(a);
    a.style = 'display: none';
    a.click();
    a.remove();
}

let downloadButton = document.getElementById("download");
let fileField = document.getElementById("file");

downloadButton.addEventListener("click", function() {

    if (fileField.files.length == 0) {
        alert("no file seleceted");
        return;
    }

    var reader = new FileReader();
    reader.onload = function() {

        let result = reader.result.replaceAll(",", "\n");
        downloadBlob(result, "result.txt", "text/plain")
    }

    reader.readAsText(fileField.files[0]);
});