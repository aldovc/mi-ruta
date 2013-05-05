<?php
class MRoutes extends CI_Model {

  function __construct()
  {
    parent::__construct();
  }

  function get_route_from_to($from = "" , $to = "")
  {
    $result[] = array(
      'number' => 0,
      'icon' => "routeIcon startIcon",
      'detail' => "Incio de ruta");
    $result[] = array(
      'number' => 1,
      'icon' => "routeIcon middleIcon",
      'detail' => "Transbordo en: ");
    $result[] = array(
      'number' => 2,
      'icon' => "routeIcon endIcon",
      'detail' => "Fin de ruta");

    return $result;
  }
}
