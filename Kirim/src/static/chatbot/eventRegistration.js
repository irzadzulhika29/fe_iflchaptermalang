export const programRegistrationFlow = (program) => [
  {
    id: "welcome",
    type: "bot",
    text: `Halo! 👋
  Selamat datang di Program ${
    program?.title || "We Care Them (WCT) 2025"
  } - Indonesian Future Leaders Chapter Malang.
  
  Terima kasih sudah tertarik untuk bergabung sebagai volunteer! 🥳
  
  Info Penting:
  • Volunteer maksimal: ${
    program?.participant || "12"
  } Orang (otomatis ditutup portalnya)
  • Pendaftaran: 25 November - 1 Desember 2025
  
  Sebelum melanjutkan, aku akan menanyakan beberapa data untuk keperluan administrasi pendaftaran ya. Silakan isi dengan benar agar proses seleksimu berjalan lancar.
  
  Yuk, kita mulai! (ketik "siap" kalau udah siap 😄)`,
    waitFor: "keyword",
    keyword: ["siap", "siapp", "siappp"],
  },

  {
    id: "ask_name",
    type: "ask",
    key: "name",
    label: "Nama Lengkap",
    text: "Siapa nama lengkap kamu?",
  },

  {
    id: "ask_phone",
    type: "ask",
    key: "phone_number",
    label: "Nomor WhatsApp",
    text: "Nomor WhatsApp kamu berapa?\n\nContoh: 081234567890",
    validation: "phone",
  },

  {
    id: "ask_guidebook",
    type: "ask",
    key: "hasReadGuidebook",
    label: `Sudah membaca GuideBook Volunteer ${
      program?.title || "We Care Them 2025"
    }`,
    text: `Sudah membaca GuideBook Volunteer ${
      program?.title || "We Care Them 2025"
    }?\n\nLink GuideBook: https://drive.google.com/drive/folders/1bEgPvx1aV1BKPSytjOwEFtVZt7FtVrNv?usp=sharing\n\nPilihan jawaban: SUDAH atau BELUM`,
    options: ["SUDAH", "BELUM"],
  },

  {
    id: "ask_instagram",
    type: "ask",
    key: "instagram",
    label: "Username Instagram",
    text: "Username Instagram kamu apa?\n\nContoh: @username atau username",
    validation: "instagram",
  },

  {
    id: "ask_source",
    type: "ask",
    key: "infoSource",
    label: "Tau informasi Indonesian Future Leaders dari mana?",
    text: "Tau informasi Indonesian Future Leaders dari mana?\n\nPilihan:\na. Teman\nb. Instagram\nc. Story/Share Group\nd. Lain-lain",
    options: ["Teman", "Instagram", "Story/Share Group", "Lain-lain"],
  },

  {
    id: "ask_reason",
    type: "ask",
    key: "reason",
    label: `Alasan ingin menjadi Volunteer ${
      program?.title || "We Care Them 2025"
    }`,
    text: `Apa alasan kamu ingin menjadi volunteer ${
      program?.title || "We Care Them 2025"
    }?`,
  },

  {
    id: "ask_experience",
    type: "ask",
    key: "experience",
    label: "Pengalaman yang berhubungan dengan volunteer",
    text: "Boleh ceritakan pengalaman yang berhubungan dengan volunteer?",
  },

  {
    id: "payment_info",
    type: "ask",
    key: "payment_status",
    label: "Status Pembayaran",
    text: "💰 Informasi Pembayaran\n\nSilakan lakukan pembayaran sesuai nominal dan metode di bawah ini.\n\nJika sudah transfer, silakan klik tombol SUDAH.",
    options: ["SUDAH", "BELUM"],
    showPayment: true,
  },

  {
    id: "ask_proof_documents",
    type: "ask",
    key: "proofDocuments",
    label: "Link Google Drive untuk semua bukti dokumen",
    text:
      "Kirim link Google Drive yang berisi SEMUA dokumen berikut:\n\n" +
      "1. Bukti Follow instagram @ifutureleaders_malang\n" +
      "2. Bukti share poster Open Recruitment Volunteer\n" +
      "3. Bukti pembayaran\n\n" +
      "Pastikan:\n" +
      "• Semua file sudah diupload dalam 1 folder Google Drive\n" +
      "• Akses diset: Anyone with the link can view\n" +
      "• Link berbentuk: drive.google.com/drive/folders/xxxxx\n\n" +
      "Kirim link folder Google Drive kamu:",
    validation: "url",
  },

  {
    id: "ask_commitment",
    type: "ask",
    key: "commitment",
    label: "Siap mengikuti dan berkomitmen untuk serangkaian acara",
    text: "Siap mengikuti dan berkomitmen untuk serangkaian acara dari awal hingga akhir?\n\nPilihan jawaban: SIAP dan BELUM SIAP",
    options: ["SIAP", "BELUM SIAP"],
  },

  {
    id: "hint_done",
    type: "bot",
    text: 'Datanya udah masuk semua. Ketik "udah" buat lihat rekap sebelum dikirim. 😉',
    waitFor: "keyword",
    keyword: ["udah"],
  },
];
