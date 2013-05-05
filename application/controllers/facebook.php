<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Facebook extends CI_Controller {

	public function index()
	{
    $vars['view']= 'facebook_login';
		$this->load->view('template', $vars);
	}
}

/* End of file home.php */
/* Location: ./application/controllers/home.php */
