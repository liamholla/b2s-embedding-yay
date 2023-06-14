console.log("Hello B2S");

// 1. Create a variable to store the vizContainer
const url =
  "https://public.tableau.com/views/b2s-embedding/Dashboard1?:language=en-GB&:display_count=n&:origin=viz_share_link";
const containerDiv = document.getElementById("vizContainer");

// 2. Create a variable to store the dashboard options
const options = {
  device: "desktop",
  height: "800px",
  width: "900px",
};

let viz;
// 3 Create a variable to store the URL (if doesn't load might need to store height and width)

const exportpdfbutton = document.getElementById("exportPDF");
const exportPowerPointbutton = document.getElementById("exportPowerpoint");
const exportImageButton = document.getElementById("exportImage");

function initViz() {
  viz = new tableau.Viz(containerDiv, url, options);
}

document.addEventListener("DOMContentLoaded", initViz);

function exportPDFfunction() {
  viz.showExportPDFDialog();
}

function exportPowerPointFunction() {
  viz.showExportPowerPointDialog();
}

function exportImageFunction() {
  viz.showExportImageDialog();
}

exportpdfbutton.addEventListener("click", exportPDFfunction);
exportPowerPointbutton.addEventListener("click", exportPowerPointFunction);
exportImageButton.addEventListener("click", exportImageFunction);

document
  .getElementById("filterButton")
  .addEventListener("click", getRangeValues);

function getRangeValues() {
  const minValue = document.getElementById("minValue").value;
  const maxValue = document.getElementById("maxValue").value;
  console.log(minValue, maxValue);
  //   Need to get active sheet, but this could be a dashboard aor worksheet
  const workbook = viz.getWorkbook();
  const activeSheet = workbook.getActiveSheet();
  const sheets = activeSheet.getWorksheets();
  //   Inspect the sheets we need to filter
  console.log(sheets);
  //   Index of the sheets you want to filter
  const sheetToFilter = sheets[0];
  // do the filtering
  sheetToFilter
    .applyRangeFilterAsync("SUM(Sales)", { min: minValue, max: maxValue })
    .then(alert("Viz filtered"));
}
