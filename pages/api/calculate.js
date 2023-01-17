import { GoogleSpreadsheet } from 'google-spreadsheet';
import credentials from '../../credentials.json';

async function sheets() {
  const doc = new GoogleSpreadsheet(credentials.x_sheet_id);
  await doc.useServiceAccountAuth(credentials);
  await doc.loadInfo();
  return doc.sheetsByIndex[credentials.x_sheet_index];
}

export default async function handler(req, res) {

  if (!req.query.for) {
    res.status(400).json({
      ok: false,
      error: 'You must add a "for" query with a number'
    });
    return;
  }

  const n = parseInt(req.query.for);

  if (isNaN(n)) {
    res.status(400).json({
      ok: false,
      error: 'The "for" query must be a number'
    });
    return;
  }

  const sheet = await sheets();
  await sheet.loadCells("F7:F8");
  const inputCell = sheet.getCellByA1("F7");
  inputCell.value = n.toString();
  await sheet.saveUpdatedCells();
  await sheet.loadCells("E103:E105");
  await sheet.loadCells("E122:E122");

  const data = {
    bce: Number(sheet.getCellByA1("E105").value),
    vane: Number(sheet.getCellByA1("E103").value),
    tire: Number(sheet.getCellByA1("E104").value),
    pe: Number(sheet.getCellByA1("E122").value)
  };

  console.log(data);

  res.status(200).json(data);
}