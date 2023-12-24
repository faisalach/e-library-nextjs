import mongoose, { Schema } from "mongoose";

const BukuSchema = new Schema(
  {
    judul_buku: String,
    kategori_buku: String,
    penerbit: String,
    pengarang: String,
    tahun_terbit: Number,
    jumlah_halaman: Number,
    jumlah_eksemplar: Number,
  },
  {
    timestamps: true,
  }
);

const Buku = mongoose.models.Buku || mongoose.model("Buku", BukuSchema);
export default Buku;