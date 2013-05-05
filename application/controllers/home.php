<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Home extends CI_Controller {

  function __construct()
  {
    parent::__construct();
    parse_str($_SERVER['QUERY_STRING'], $_REQUEST);
    $CI = & get_instance();
    $CI->config->load("facebook",TRUE);
    $config = $CI->config->item('facebook');
    $this->load->library('facebook', $config);
    $this->load->library('session');
    $this->load->model('muser');
  }


	public function index()
	{
    $this->check_session();

    $this->load->model('mroutes');
    $vars['view']= 'home';
    $vars['events'] = $this->mroutes->get_route_from_to();
		$this->load->view('template', $vars);
	}

  private function check_session()
  {
    $user = $this->facebook->getUser();
    if($user)
    {
      try {
        $this->session->set_userdata($this->facebook->api('/me'));
      } catch(FacebookApiException $e) {
        $this->user_profile = null;
      }
    }
    else
    {
      $this->session->set_userdata(array('url' => $this->facebook->getLoginUrl(array('scope' => 'email'))));
    }
	}
}

/* End of file home.php */
/* Location: ./application/controllers/home.php */
