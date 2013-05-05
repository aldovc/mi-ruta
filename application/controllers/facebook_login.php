<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Facebook_Login extends CI_Controller {

  function __construct()
  {
    parent::__construct();
    parse_str($_SERVER['QUERY_STRING'], $_REQUEST);
    $CI = & get_instance();
    $CI->config->load("facebook",TRUE);
    $config = $CI->config->item('facebook');
    $this->load->library('facebook', $config);
  }

	public function index()
	{

    $vars['view']= 'facebook_login';
		$this->load->view('template', $vars);
	}
}

/* End of file home.php */
/* Location: ./application/controllers/home.php */
