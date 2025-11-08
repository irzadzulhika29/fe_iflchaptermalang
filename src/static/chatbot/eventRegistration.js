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

  {
    id: "ask_name",
    type: "ask",
    key: "fullName",
    label: "Nama Lengkap",
    text: "Siapa nama lengkap kamu?",
  },

  {
    id: "ask_phone",
    type: "ask",
    key: "whatsapp",
    label: "Nomor WhatsApp",
    text: "Nomor **WhatsApp** kamu berapa? (format: wa.me/62-xxxxxxxxxx)",
    validation: "whatsapp",
  },

  {
    id: "ask_guidebook",
    type: "ask",
    key: "hasReadGuidebook",
    label: "Sudah membaca GuideBook Volunteer Close The Gap 2025",
    text: "Sudah membaca **GuideBook Volunteer Close The Gap 2025**? (pilihan jawaban: **SUDAH** atau **BELUM**)",
    options: ["SUDAH", "BELUM"],
  },

  {
    id: "ask_instagram",
    type: "ask",
    key: "instagram",
    label: "Username Instagram",
    text: "Username **Instagram** kamu apa? (format: instagram.com/username)",
    validation: "instagram",
  },

  {
    id: "ask_source",
    type: "ask",
    key: "infoSource",
    label: "Tau informasi Indonesian Future Leaders dari mana?",
    text: "Tau informasi **Indonesian Future Leaders** dari mana?\n\nPilihan:\na. Teman\nb. Instagram\nc. Story/Share Group\nd. Lain-lain",
    options: ["Teman", "Instagram", "Story/Share Group", "Lain-lain"],
  },

  {
    id: "ask_reason",
    type: "ask",
    key: "reason",
    label: "Alasan ingin menjadi volunteer Close The Gap 2025",
    text: "Apa **alasan** kamu ingin menjadi volunteer **Close The Gap 2025**?",
  },

  {
    id: "ask_experience",
    type: "ask",
    key: "experience",
    label: "Pengalaman yang berhubungan dengan volunteer",
    text: "Boleh ceritakan **pengalaman** yang berhubungan dengan volunteer?",
  },

  {
    id: "ask_follow_proof",
    type: "ask",
    key: "followProof",
    label: "Bukti Follow instagram @ifutureleaders_malang",
    text: "Upload **screenshot bukti Follow** instagram @ifutureleaders_malang atau kirim link postingan kamu.",
    allowUpload: true,
  },

  {
    id: "ask_share_proof",
    type: "ask",
    key: "shareProof",
    label: "Bukti share poster Open Recruitment Volunteer",
    text: "Upload **screenshot bukti share poster** Open Recruitment Volunteer Close The Gap 2025 atau kirim link postingan.",
    allowUpload: true,
  },

  {
    id: "ask_payment",
    type: "ask",
    key: "paymentProof",
    label: "Bukti Pembayaran sebesar Rp. 65.000",
    text: "Upload **bukti transfer** sebesar **Rp. 65.000** (screenshot/foto).",
    allowUpload: true,
  },

  {
    id: "ask_commitment",
    type: "ask",
    key: "commitment",
    label: "Siap mengikuti dan berkomitmen untuk serangkaian acara",
    text: "Siap mengikuti dan berkomitmen untuk serangkaian acara dari awal hingga akhir? (pilihan jawaban: **SIAP** dan **BELUM SIAP**)",
    options: ["SIAP", "BELUM SIAP"],
  },

  {
    id: "hint_done",
    type: "bot",
    text: 'Datanya udah masuk semua. Ketik **"udah"** buat lihat rekap sebelum dikirim. 😉',
  },
];