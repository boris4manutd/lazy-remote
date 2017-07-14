<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$app->get('/', function () use ($app)
{
    $output = [
        'os'            => php_uname('s'),
        'systemVersion' => env('APP_VERSION'),
        'fw'            => $app->version(),
    ];

    return $output;
});

$app->group(['prefix' => 'volume'], function () use ($app)
{
    $app->get('', 'SoundController@VolumeStatus');

    $app->post('get', 'SoundController@VolumeGet');

    $app->post('up', 'SoundController@VolumeUp');
    $app->post('down', 'SoundController@VolumeDown');
    $app->post('set', 'SoundController@VolumeSet');

    $app->post('mute', 'SoundController@MuteVolume');
    $app->post('unmute', 'SoundController@UnmuteVolume');

    $app->post('balance', 'SoundController@BalanceSet');
});

$app->group(['prefix' => 'system'], function () use ($app)
{
    $app->post('shutdown', 'SystemController@ShutDown');
    $app->post('reset', 'SystemController@Reset');
    $app->post('sleep', 'SystemController@Sleep');
    $app->post('logoff', 'SystemController@LogOff');
    $app->post('lock', 'SystemController@Lock');
});