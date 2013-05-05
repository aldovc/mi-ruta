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
      'icon' => "images/start.png",
      'detail' => "A detail");
    $result[] = array(
      'number' => 1,
      'icon' => "images/start.png",
      'detail' => "A second detail");

    return $result;
  }
}
