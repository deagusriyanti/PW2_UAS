<?php

namespace App\Http\Controllers;

use App\Models\Kunjungan;
use App\Models\Pasien;
use Illuminate\Http\Request;
use Carbon\Carbon;

class KunjunganController extends Controller
{
    // 🔥 UNTUK ROUTE: GET /kunjungan
    public function index()
    {
        return response()->json(
            Kunjungan::with('pasien')
                ->orderBy('tanggal_kunjungan', 'desc')
                ->get()
        );
    }

    // 🔥 UNTUK: GET /pasien/{id}/kunjungan
    public function indexByPasien($id)
    {
        Pasien::findOrFail($id);

        $kunjungan = Kunjungan::where('pasien_id', $id)
            ->orderBy('tanggal_kunjungan', 'desc')
            ->get();

        return response()->json($kunjungan);
    }

    public function store(Request $request, $id)
    {
        Pasien::findOrFail($id);

        $request->validate([
            'tanggal_kunjungan' => 'required|date',
            'keluhan' => 'nullable|string',
            'diagnosa' => 'nullable|string',
            'tindakan' => 'nullable|string',
        ]);

        $tanggal = Carbon::parse($request->tanggal_kunjungan);
        $today = Carbon::today();

        $nomorAntrian = null;
        $status = null;

        if ($tanggal->isSameDay($today)) {
            $lastQueue = Kunjungan::whereDate('tanggal_kunjungan', $today)
                ->max('nomor_antrian');

            $nomorAntrian = $lastQueue ? $lastQueue + 1 : 1;
            $status = 'MENUNGGU';
        }

        $kunjungan = Kunjungan::create([
            'pasien_id' => $id,
            'tanggal_kunjungan' => $tanggal,
            'keluhan' => $request->keluhan,
            'diagnosa' => $request->diagnosa,
            'tindakan' => $request->tindakan,
            'status' => $status,
            'nomor_antrian' => $nomorAntrian,
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

    public function update(Request $request, $id, $kunjunganId)
    {
        $kunjungan = Kunjungan::where('pasien_id', $id)
            ->findOrFail($kunjunganId);

        $kunjungan->update($request->only([
            'keluhan',
            'diagnosa',
            'tindakan',
            'status'
        ]));

        return response()->json($kunjungan);
    }

    public function destroy($id, $kunjunganId)
    {
        $kunjungan = Kunjungan::where('pasien_id', $id)
            ->findOrFail($kunjunganId);

        $kunjungan->delete();

        return response()->json(['message' => 'Kunjungan berhasil dihapus']);
    }
    
    public function updateStatus(Request $request, $id)
{
    $request->validate([
        'status' => 'required|in:MENUNGGU,DALAM_PEMERIKSAAN,SELESAI'
    ]);

    $kunjungan = Kunjungan::findOrFail($id);
    $kunjungan->status = $request->status;
    $kunjungan->save();

    return response()->json([
        'message' => 'Status berhasil diubah',
        'data' => $kunjungan
    ]);
}

    public function antrianHariIni()
{
    $start = Carbon::today();
    $end   = Carbon::tomorrow();

    return response()->json([
        'total_hari_ini' => Kunjungan::whereBetween(
            'tanggal_kunjungan', [$start, $end]
        )->count(),

        'menunggu' => Kunjungan::whereBetween(
            'tanggal_kunjungan', [$start, $end]
        )->where('status', 'MENUNGGU')->count(),

        'dalam_pemeriksaan' => Kunjungan::whereBetween(
            'tanggal_kunjungan', [$start, $end]
        )->where('status', 'DALAM_PEMERIKSAAN')->count(),

        'selesai' => Kunjungan::whereBetween(
            'tanggal_kunjungan', [$start, $end]
        )->where('status', 'SELESAI')->count(),

        'antrian' => Kunjungan::with('pasien')
            ->whereBetween('tanggal_kunjungan', [$start, $end])
            ->whereIn('status', ['MENUNGGU', 'DALAM_PEMERIKSAAN', 'SELESAI'])
            ->orderBy('nomor_antrian')
            ->get()
    ]);
}

}
