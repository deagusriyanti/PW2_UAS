<?php

namespace App\Http\Controllers;

use App\Models\Kunjungan;
use App\Models\Pasien;
use Illuminate\Http\Request;

class KunjunganController extends Controller
{
    public function index($id)
    {
        Pasien::findOrFail($id);
        $kunjungan = Kunjungan::where('pasien_id', $id)->get();
        return response()->json($kunjungan);
    }

    public function store(Request $request, $id)
    {
        Pasien::findOrFail($id);

        $kunjungan = Kunjungan::create([
            'pasien_id' => $id,
            'tanggal_kunjungan' => $request->tanggal_kunjungan,
            'keluhan' => $request->keluhan,
            'diagnosa' => $request->diagnosa,
            'tindakan' => $request->tindakan,
        ]);

        return response()->json($kunjungan, 201);
    }

    public function show($id, $kunjunganId)
{
    $kunjungan = Kunjungan::where('pasien_id', $id)
                ->where('id', $kunjunganId)
                ->first();

    if (!$kunjungan) {
        return response()->json(['message' => 'Kunjungan tidak ditemukan'], 404);
    }

    return response()->json($kunjungan);
}

    // UPDATE kunjungan
    public function update(Request $request, $id, $kunjunganId)
    {
        $kunjungan = Kunjungan::where('pasien_id', $id)->findOrFail($kunjunganId);

        $kunjungan->update($request->all());

        return response()->json($kunjungan);
    }

    // DELETE kunjungan
    public function destroy($id, $kunjunganId)
    {
        $kunjungan = Kunjungan::where('pasien_id', $id)->findOrFail($kunjunganId);
        $kunjungan->delete();

        return response()->json(['message' => 'Kunjungan berhasil dihapus']);
    }
}
