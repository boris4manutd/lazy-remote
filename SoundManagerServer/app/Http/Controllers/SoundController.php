<?php

namespace App\Http\Controllers;

use Log;
use Laravel\Lumen\Routing\Controller;
use Illuminate\Http\Request;

class SoundController extends Controller
{
    private $platform;

    public function __construct()
    {
        $os = php_uname('s');
        switch ($os) {
            case "Windows NT":
                $this->platform = new \App\Classes\Components\Sound\Windows();
                break;
            case "Linux":
                $this->platform = new \App\Classes\Components\Sound\Linux();
                break;
            default:
                $this->platform = new \App\Classes\Components\Sound\MacOS();
        }
    }

    public function VolumeStatus()
    {
        return $this->platform->GetStatus();
    }

    public function VolumeUp(Request $request)
    {
        $this->validate($request, [
            'balance' => 'required|integer|min:-50|max:50',
        ]);

        $balance = $request->input('balance');

        $this->platform->VolumeUp($balance);

        return $this->platform->GetStatus();
    }

    public function VolumeDown(Request $request)
    {
        $this->validate($request, [
            'balance' => 'required|integer|min:-50|max:50',
        ]);

        $balance = $request->input('balance');

        $this->platform->VolumeDown($balance);

        return $this->platform->GetStatus();
    }

    public function VolumeSet(Request $request)
    {
        $volume = $request->input('volume');

        $this->validate($request, [
            'volume' => 'required|integer|min:0|max:100',
        ]);

        $this->platform->SetVolume($volume);
    }

    public function VolumeGet()
    {
        return $this->platform->GetVolume();
    }

    private function ValidateInputVolume($volume)
    {
        $output = true;
        if (! is_numeric($volume))
        {
            $output = false;
        }

        if ($volume < 0 || $volume > 100)
        {
            $output = false;
        }

        return $output;
    }

    public function MuteVolume()
    {
        $this->platform->VolumeMute();

        return $this->platform->GetStatus();
    }

    public function UnmuteVolume()
    {
        $this->platform->VolumeUnmute();

        return $this->platform->GetStatus();
    }

    public function BalanceSet(Request $request)
    {
        $balance = $request->input('balance');

        Log::info(var_export($request->all(), true));
        $this->validate($request, [
            'balance' => 'required|integer|min:-50|max:50',
        ]);

        $balance = $request->input('balance');

        $this->platform->SetBalance($balance);

        return $this->platform->GetStatus();
    }
}
