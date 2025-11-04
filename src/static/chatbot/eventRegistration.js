// src/static/chat/flows/programRegistration.js
export const programRegistrationFlow = (program) => [
  {
    id: "welcome",
    type: "bot",
    text:
      "Halo {User}! 👋\nSelamat datang di Program " +
      (program?.title || "Program") +
      ".\nTerima kasih sudah tertarik untuk bergabung! 🥳\n\n" +
      "Sebelum melanjutkan, aku akan menanyakan beberapa data untuk keperluan administrasi pendaftaran ya. " +
      "Silakan isi dengan benar agar proses seleksimu berjalan lancar.\n\n" +
      "Yuk, kita mulai! (ketik **siap** kalau udah siap 😄)",
    waitFor: "keyword",
    keyword: ["siap", "siapp", "siappp"],
  },

  // 1) Universitas
  {
    id: "ask_univ",
    type: "ask",
    key: "university",
    label: "Asal Universitas",
    text: "Kamu berasal dari universitas mana?",
  },

  // 2) ID Line
  {
    id: "ask_line",
    type: "ask",
    key: "idLine",
    label: "ID Line",
    text: "Boleh minta **ID Line** kamu?",
  },

  // 3) Nomor WhatsApp
  {
    id: "ask_phone",
    type: "ask",
    key: "whatsapp",
    label: "No HP (WhatsApp)",
    text: "Nomor **WhatsApp** aktifmu berapa? (contoh: 0857xxxxxxx)",
  },

  // 4) Link Berkas (Google Drive)
  {
    id: "ask_docs",
    type: "ask",
    key: "driveLink",
    label: "Link Berkas",
    text:
      "Terakhir, kirim **link folder Google Drive** berisi berkas pendaftaranmu " +
      "(Application Form, CV, Portofolio — khusus SI & VAD, serta bukti screenshot). " +
      'Jangan lupa set ke **"Anyone with the link can view"** ya.',
  },

  // hint selesai
  {
    id: "hint_done",
    type: "bot",
    text: 'Datanya udah masuk semua. Ketik **"udah"** buat lihat rekap sebelum dikirim. 😉',
  },
];
