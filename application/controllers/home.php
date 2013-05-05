<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Home extends CI_Controller {

	public function index()
	{
    $this->load->model('mroutes');
    $vars['view']= 'home';
    $vars['events'] = $this->mroutes->get_route_from_to();
		$this->load->view('template', $vars);
	}
}

/* End of file home.php */
/* Location: ./application/controllers/home.php */
