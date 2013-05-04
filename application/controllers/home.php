<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Home extends CI_Controller {

	public function index()
	{
    $vars['view']= 'map';
		$this->load->view('template', $vars);
	}
}

/* End of file home.php */
/* Location: ./application/controllers/home.php */
