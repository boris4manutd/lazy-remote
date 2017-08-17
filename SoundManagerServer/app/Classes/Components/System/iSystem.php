<?php

namespace App\Classes\Components\System;

interface iSystem
{
    // system controlls
    public function ShutDownServer();
    public function SleepServer();
    public function ResetServer();

    public function LockServer();
    public function LogOffCurrentUser();
}