import { GoogleSpreadsheet } from 'google-spreadsheet';

async function sheets() {
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_X_SHEET_ID);
  await doc.useServiceAccountAuth({
    type: process.env.GOOGLE_TYPE,
    project_id: process.env.GOOGLE_PROJECT_ID,
    private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
    private_key: process.env.GOOGLE_PRIVATE_KEY,
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    client_id: process.env.GOOGLE_CLIENT_ID,
    auth_uri: process.env.GOOGLE_AUTH_URI,
    token_uri: process.env.GOOGLE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.GOOGLE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.GOOGLE_CLIENT_X509_CERT_URL
  });
  await doc.loadInfo();
  return doc.sheetsByIndex[parseInt(process.env.GOOGLE_X_SHEET_INDEX)];
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