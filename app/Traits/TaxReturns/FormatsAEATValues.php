<?php

namespace App\Traits\TaxReturns;


use App\Models\Services\TaxModels\TaxModelDraft;

trait FormatsAEATValues
{
    private static function formatValue($value, $type, $size, $decimals = 0) {
        $result = '';
        if($type === 'An') {
            $result .= str_pad($value, $size, " ", STR_PAD_RIGHT);
        } elseif($type === 'Num') {
            if($decimals > 0) {
                $split = explode(",", number_format($value, 2, ',', ''));
                $result .= str_pad($split[0], $size - $decimals, "0", STR_PAD_LEFT) . str_pad($split[1], $decimals, "0", STR_PAD_RIGHT);
            } else {
                $result .= str_pad($value, $size, "0", STR_PAD_LEFT);
            }
        } elseif($type === 'A') {
            $result .= str_pad("", $size, " ", STR_PAD_RIGHT);
        } elseif($type === 'N') {
            if($decimals > 0) {
                $split = explode(",", number_format($value, 2, ',', ''));
                if((int) $split[0] < 0) {
                    $result .= 'N';
                    $size--;
                }
                $result .= str_pad($split[0], $size - $decimals, "0", STR_PAD_LEFT) . str_pad($split[1], $decimals, "0", STR_PAD_RIGHT);
            } else {
                $result .= str_pad($value, $size, "0", STR_PAD_LEFT);
            }
        }
        return $result;
    }
}