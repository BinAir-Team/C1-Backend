'use strict';
const {v4: uuid} = require('uuid');
let bandara = [
  {
    id: uuid(),
    code: "BTH",
    city: "Batam",
    airport: "Hang Nadim International Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "BTJ",
    city: "Banda Aceh",
    airport: "Sultan Iskandar Muda International Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "MES",
    city: "Medan",
    airport: "Polonia International Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "KMU",
    city: "Medan",
    airport: "Kuala Namu International Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "PDG",
    city: "Padang",
    airport: "Minangkabau International Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "DJB",
    city: "Jambi",
    airport: "Sultan Thaha International Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "PKU",
    city: "Pekanbaru",
    airport: "Sultan Syarif Kasim II International Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "PLM",
    city: "Palembang",
    airport: "Sultan Mahmud Badaruddin II International Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "TNJ",
    city: "Tanjung Pinang",
    airport: "Raja Haji Fisabilillah International Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "PGK",
    city: "Pangkal Pinang",
    airport: "Depati Amir International Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "TKG",
    city: "Bandar Lampung",
    airport: "Radin Inten II International Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "BDO",
    city: "Bandung",
    airport: "Husein Sastranegara International Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "CGK",
    city: "Tangerang",
    airport: "Soekarno-Hatta International Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "JOG",
    city: "Yogyakarta",
    airport: "Adi Sucipto International Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "SOC",
    city: "Solo",
    airport: "Adisumarmo International Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "SRG",
    city: "Semarang",
    airport: "Achmad Yani International Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "SUB",
    city: "Surabaya",
    airport: "Juanda International Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "MLG",
    city: "Malang",
    airport: "Abdul Rachman Saleh Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "DQJ",
    city: "Banyuwangi",
    airport: "Blimbingsari Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "DPS",
    city: "Denpasar",
    airport: "Ngurah Rai International Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "LOP",
    city: "Lombok Tengah",
    airport: "Lombok International Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "KOE",
    city: "Kupang",
    airport: "El Tari International Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "PKY",
    city: "Palangka Raya",
    airport: "Tijilik Riwut Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "MTW",
    city: "Muara Teweh",
    airport: "Beringin Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "PKN",
    city: "Pangkalan Bun",
    airport: "Iskandar Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "SMQ",
    city: "Sampit",
    airport: "H. Asan Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "TBM",
    city: "Katingan",
    airport: "Tumbang Samba Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "WAOU",
    city: "Buntok",
    airport: "Sanggu Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "TRK",
    city: "Tarakan",
    airport: "Juwata International Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "SRI",
    city: "Samarinda",
    airport: "Temindung Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "BEJ",
    city: "Berau",
    airport: "Kalimarau International Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "BXT",
    city: "Bontang",
    airport: "Bontang Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "BPN",
    city: "Balikpapan",
    airport: "Sepinggan International Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "BEJ",
    city: "Tanjung Redeb",
    airport: "Kalimarau Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "NNX",
    city: "Nunukan",
    airport: "Nunukan Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "TNB",
    city: "Tanah Grogot",
    airport: "Tanah Grogot Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "KOD",
    city: "Kutai Kartanegara",
    airport: "Kotabangun Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "SZH",
    city: "Kutai Kartanegara",
    airport: "Senipah Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "DTD",
    city: "Kutai Barat",
    airport: "Datah Dawai Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "TSX",
    city: "Marang Kayu",
    airport: "Tanjung Santan Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "SGQ",
    city: "Kutai Timur",
    airport: "Sangkimah Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "MLK",
    city: "Kutai Barat",
    airport: "Melalan Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "LBW",
    city: "Krayan",
    airport: "Yuvai Semaring Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "BYQ",
    city: "Bulungan",
    airport: "Bunyu Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "NAF",
    city: "Bulungan",
    airport: "Banaina Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "TJS",
    city: "Bulungan",
    airport: "Tanjung Harapan Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "MLN",
    city: "Malinau",
    airport: "R.A. Bessing Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "LPU",
    city: "Malinau",
    airport: "Long Ampung Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "BDJ",
    city: "Banjarmasin",
    airport: "Syamsuddin Noor International Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "TJG",
    city: "Tanjung",
    airport: "Warukin Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "KBU",
    city: "Kotabaru",
    airport: "Stagen Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "BTW",
    city: "Batulicin",
    airport: "Bersujud Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "PNK",
    city: "Pontianak",
    airport: "Supadio International Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "PSU",
    city: "Putussibau",
    airport: "Pangsuma Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "KTG",
    city: "Ketapang",
    airport: "Rahadi Oesman Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "SQG",
    city: "Sintang",
    airport: "Susilo Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "NPO",
    city: "Melawi",
    airport: "Nanga Pinoh Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "MDC",
    city: "Manado",
    airport: "Sam Ratulangi International Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "UPG",
    city: "Makassar",
    airport: "Sultan Hasanuddin International Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "PLW",
    city: "Palu",
    airport: "Mutiara Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "MXB",
    city: "Masamba",
    airport: "Andi Jemma Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "RPI",
    city: "Rampi",
    airport: "Rampi Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "BKS",
    city: "Bengkulu",
    airport: "Fatmawati Soekarno Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "TKG",
    city: "Bandar Lampung",
    airport: "Radin Inten II Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "DJB",
    city: "Jambi",
    airport: "Sultan Thaha Syaifuddin Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "PGK",
    city: "Pangkal Pinang",
    airport: "Depati Amir Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "SBG",
    city: "Sabang",
    airport: "Maimun Saleh Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "LSX",
    city: "Aceh Utara",
    airport: "Lhok Sukon Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "LSW",
    city: "Lhokseumawe",
    airport: "Malikus Saleh Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "MEQ",
    city: "Nagan Raya",
    airport: "Cut Nyak Dhien Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "TPK",
    city: "Tapaktuan",
    airport: "Teuku Cut Ali Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "SKL",
    city: "Singkil",
    airport: "Syekh Hamzah Fansyuri Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "SNB",
    city: "Sinabang",
    airport: "Lasikin Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "SIW",
    city: "Toba Samosir",
    airport: "Sibisa Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "BRT",
    city: "Parbaba",
    airport: "Barita Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "SQT",
    city: "Siborong-borong",
    airport: "Silangit Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "SIX",
    city: "Sibolga",
    airport: "Dr. Ferdinand Lumban Tobing Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "AEG",
    city: "Padang Sidempuan",
    airport: "Aek Godang Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "GNS",
    city: "Gunung Sitoli",
    airport: "Binaka Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "LSE",
    city: "Pulau-pulau Batu",
    airport: "Lasondre Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "DUM",
    city: "Dumai",
    airport: "Pinang Kampai Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "SEQ",
    city: "Bengkalis",
    airport: "Sungai Pakning Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "PPR",
    city: "Pasir Pengaraian",
    airport: "Pasir Pengaraian Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "SIQ",
    city: "Singkep",
    airport: "Dabo Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "RGT",
    city: "Rengat",
    airport: "Japura Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "TJB",
    city: "Karimun",
    airport: "Sei Bati Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "NTX",
    city: "Natuna",
    airport: "Ranai Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "MWK",
    city: "Pal Matak",
    airport: "Matak Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "RKO",
    city: "Sipura",
    airport: "Rokot Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "KRC",
    city: "Kerinci",
    airport: "Depati Parbo Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "MPC",
    city: "Mukomuko",
    airport: "Mukomuko Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "PGK",
    city: "Pangkalpinang",
    airport: "Depati Amir Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "TJQ",
    city: "Tanjung Pandan",
    airport: "H. A. S. Hanandjoeddin Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "LLG",
    city: "Lubuklinggau",
    airport: "Silampari Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "PDO",
    city: "Muara Enim",
    airport: "Pendopo Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "MAF",
    city: "Muara Bungo",
    airport: "Muara Bungo Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "HLP",
    city: "Jakarta",
    airport: "Halim Perdana Kusuma Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "MLG",
    city: "Malang",
    airport: "Abdul Rachman Saleh Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "MAN",
    city: "Madiun",
    airport: "Iswahyudi Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "PCB",
    city: "Pamulang",
    airport: "Pondok Cabe Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "PPJ",
    city: "Kepulauan Seribu",
    airport: "Pulau Panjang Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "TSY",
    city: "Tasikmalaya",
    airport: "Cibeureum Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "CBN",
    city: "Cirebon",
    airport: "Cakrabhuwana Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "CXP",
    city: "Cilacap",
    airport: "Tunggul Wulung Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "PWL",
    city: "Purbalingga",
    airport: "Wirasaba Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "KWB",
    city: "Karimunjawa",
    airport: "Dewandaru Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "CPF",
    city: "Cepu",
    airport: "Ngloram Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "SUP",
    city: "Sumenep",
    airport: "Trunojoyo Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "MSI",
    city: "Masalembo",
    airport: "Masalembo Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "WGI",
    city: "Banyuwangi",
    airport: "Blimbingsari Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "CMS",
    city: "Ciamis",
    airport: "Nusawiru Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "SWQ",
    city: "Sumbawa Akbar",
    airport: "Brangbiji Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "LYK",
    city: "Sumbawa",
    airport: "Lunyuk Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "BMU",
    city: "Bima",
    airport: "Muhammad Salahuddin Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "BSX",
    city: "Kupang",
    airport: "El Tari Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "LBJ",
    city: "Manggarai Barat",
    airport: "Komodo Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "RTG",
    city: "Ruteng",
    airport: "Frans Sales Lega Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "TMC",
    city: "Waikabubak",
    airport: "Tambolaka Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "WGP",
    city: "Waingapu",
    airport: "Umbu Mehang Kunda Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "BJW",
    city: "Bajawa",
    airport: "Soa Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "ENE",
    city: "Ende",
    airport: "H. Hasan Aroeboesman Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "MOF",
    city: "Maumere",
    airport: "Wai Oti Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "LKA",
    city: "Larantuka",
    airport: "Gewayantana Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "LWE",
    city: "Lewoleba",
    airport: "Wonopito Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "ARD",
    city: "Alor",
    airport: "Mali Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "RTI",
    city: "Rote",
    airport: "Lekunik Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "SAU",
    city: "Pulau Sawu",
    airport: "Tardamu Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "ABU",
    city: "Atambua",
    airport: "Haliwen Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "STA",
    city: "Sangatta",
    airport: "Tanjung Bara Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "LBW",
    city: "Long Bawan",
    airport: "Yuvai Semaring Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "LPU",
    city: "Long Apung",
    airport: "Long Apung Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "BUW",
    city: "Bau-Bau",
    airport: "Betoambari Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "GTO",
    city: "Gorontalo",
    airport: "Jalaluddin Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "SQR",
    city: "Sorowako",
    airport: "Inco Soroako Waws Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "PSJ",
    city: "Poso",
    airport: "Kasiguncu Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "TLI",
    city: "Tolitoli",
    airport: "Lalos Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "LWU",
    city: "Luwu",
    airport: "Lagaligo Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "MJU",
    city: "Mamuju",
    airport: "Tampa Padang Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "MNA",
    city: "Melonguane",
    airport: "Melonguane Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "BJG",
    city: "Bolaang Mongondow",
    airport: "Mopait Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "PLW",
    city: "Palu",
    airport: "Mutiara Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    id: uuid(),
    code: "NAH",
    city: "Tahuna",
    airport: "Naha Airport",
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('datasearches', bandara, {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('datasearches', null, {});
  }
};
