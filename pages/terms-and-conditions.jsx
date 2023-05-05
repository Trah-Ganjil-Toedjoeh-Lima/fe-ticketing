import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import FooterBar from "@/components/footer";
import NavigationBar from "@/components/navbar";

export default function Tnc() {
  return (
    <>
      <NavigationBar />
      <div className='max-w-screen h-full items-center bg-gmco-white'>
        {/* HEADER */}
        <div className='max-w-screen relative h-max overflow-hidden bg-gmco-blue-main'>
          <div className='relative m-auto flex h-full flex-col justify-between pb-8 pt-24 lg:flex-row'>
            <div className='items-center md:items-start lg:ml-40 lg:items-end'>
              <h2 className='ml-8 flex w-max border-b-2 text-2xl font-bold text-gmco-white md:text-4xl'>
                Terms & Conditions
              </h2>
            </div>
          </div>
        </div>
        <div className='container mx-auto content-center space-y-4 px-8'>
          <h3 className='pt-8 text-2xl font-bold md:text-4xl'>
            Pembelian Tiket
          </h3>
          <ol className='list-decimal text-base'>
            <li>Pemesanan tiket HANYA untuk penggunaan pribadi.</li>
            <li>
              Tiket yang dianggap sah adalah yang dibeli melalui laman
              www.gmco-event.com. Panitia tidak bertanggung jawab atas pembelian
              tiket melalui calo/platform yang bukan mitra resmi Grand Concert
              Vol. 10 Anjangsana Simfoni.
            </li>
            <li>Satu pembeli dapat melakukan pembelian maksimal 5 tiket.</li>
            <li>
              Batas waktu transaksi pembayaran adalah 20 menit setelah pemilihan
              kursi. Apabila pembeli tidak melakukan transaksi selama kurun
              waktu tersebut, maka pemesanan dianggap batal.
            </li>
            <li>
              Apabila terdapat perubahan terkait alamat penerimaan tiket,
              seperti nomor telepon atau alamat email, harap menghubungi contact
              person (<b>BELUM ADA, TO BE ADDED</b>).
            </li>
            <li>
              Panitia akan menghubungi pembeli melalui email. Mohon untuk
              memastikan bahwa alamat email yang diberikan adalah valid dan
              terkini. Pembeli dimohon untuk menyadari terkait pengaturan filter
              email Anda yang mungkin menganggap email kami sebagai spam atau
              dialihkan menuju folder sampah Anda.
            </li>
            <li>
              Jalannya konser dapat didokumentasikan atau direkam. Membeli tiket
              artinya setuju bahwa pembeli mengizinkan panitia untuk
              mendokumentasikan diri Anda sebagai anggota penonton.
            </li>
            <li>Nomor tempat duduk yang sudah dibeli TIDAK dapat ditukar.</li>
            <li>
              Seluruh penonton WAJIB sudah melakukan vaksin COVID-19 minimum
              dosis dua yang dibuktikan pada aplikasi SATUSEHAT.
            </li>
            <li>
              Penonton WAJIB memilki aplikasi SATUSEHAT untuk melakukan check-in
              sebelum memasuki venue.{" "}
            </li>
          </ol>
          <h3 className='pt-8 text-2xl font-bold md:text-4xl'>
            Pengiriman Tiket
          </h3>
          <ol className='list-decimal text-base'>
            <li>
              e-Ticket akan kami kirimkan kepada Anda melalui email dan dapat
              ditukarkan dengan gelang tiket pada tanggal XX MEI 2023 mulai
              pukul XX.XX WIB.
            </li>
            <li>
              Kami tidak bertanggung jawab atas kelalaian pembeli tiket yang
              mengakibatkan e-ticket jatuh ke tangan orang lain.
            </li>
          </ol>
          <h3 className='pt-8 text-2xl font-bold md:text-4xl'>
            Hak Pembatalan dan Pengembalian Uang
          </h3>
          <ol className='list-decimal text-base'>
            <li>
              Kecuali dinyatakan dalam ketentuan lain, tiket yang telah
              terkonfirmasi pembayarannya tidak dapat ditukar dan tidak dapat
              diuangkan dalam situasi dan kondisi apapun.
            </li>
            <li>
              Apabila konser telah berlangsung dan tiket belum diterima oleh
              pembeli karena alasan berikut; panitia tidak mengirimkan e-ticket
              kepada pembeli; maka pembeli berhak mendapatkan pengembalian dana
              (refund) sejumlah harga tiket yang telah dibeli.
            </li>
            <li>
              Panitia hanya menerima pengajuan pembatalan atau pengembalian dana
              oleh pembeli yang data dirinya sesuai dengan identitas yang
              digunakan untuk membeli tiket konser Grand Concert Vol. 10.
            </li>
            <li>
              Pengajuan pengembalian dana akan dilayani selambat-lambatnya SATU
              hari sebelum acara berlangsung.
            </li>
            <li>
              Pengembalian dana yang diajukan oleh pembeli melalui narahubung
              yang tertera akan dikonfirmasi terlebih dahulu oleh panitia dan
              akan diinformasikan lebih lanjut kepada pembeli mengenai keputusan
              pengembalian dana.
            </li>
            <li>
              Apabila pengajuan pengembalian dana disetujui oleh panitia,
              pembeli diharap bersedia untuk memberikan nomor rekening sebagai
              bentuk tindak lanjut pengembalian dana yang diajukan.
            </li>
            <li>
              Panitia tidak bertanggung jawab apabila terdapat kesalahan
              pencantuman nomor rekening atau nama pembeli yang menyebabkan
              tidak diterimanya uang pengembalian.
            </li>
            <li>
              Dimohon untuk tidak mengajukan pembatalan atau pengembalian dana
              dalam satu kurun waktu berturut-turut (spamming) atau permintaan
              pembeli tidak akan dilayani oleh panitia.
            </li>
          </ol>
          <h3 className='pt-8 text-2xl font-bold md:text-4xl'>
            Pembatalan, Perubahan, atau Penundaan Konser
          </h3>
          <ol className='list-decimal pb-8 text-base'>
            <li>
              Segala perihal tentang pengubahan atau pembatalan konser adalah
              tanggung jawab panitia.{" "}
            </li>
            <li>
              Panitia menjamin memberikan pemberitahuan terkait pengubahan atau
              pembatalan konser dan akan bertanggung jawab atas hasil apa pun.
            </li>
            <li>
              Tamu yang tidak menaati tata tertib, berperilaku tidak pantas atau
              menyinggung, dan tidak mematuhi instruksi dari panitia akan segera
              dikeluarkan dari venue serta TIDAK diberikan pengembalian uang.
            </li>
            <li>
              Panitia TIDAK bertanggung jawab untuk memberikan refund tiket yang
              telah terkonfirmasi pembayarannya apabila Anda batal menonton
              konser karena alasan pribadi.
            </li>
            <li>
              Tiket yang sudah dibeli tidak dapat ditukar atau dikembalikan
              kecuali konser ditunda atau dibatalkan.
            </li>
            <li>
              Biaya terkait kebutuhan pribadi seperti biaya perjalanan atau
              akomodasi lain yang Anda keluarkan apabila konser ditunda atau
              dibatalkan BUKAN tanggung jawab panitia.
            </li>
          </ol>
        </div>
      </div>
      <FooterBar />
    </>
  );
}
