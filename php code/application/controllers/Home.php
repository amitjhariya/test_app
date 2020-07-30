<?php
defined('BASEPATH') OR exit('No direct script access allowed');
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

class Home extends CI_Controller {

	public function index()
	{
		$this->load->view('dashboard');
	}
	
	public function test(){
		header("Content-Type: application/json;charset=utf-8");
		$data=[];		
		$result = $this->db->query("SHOW TABLES");
		$tables = $result->result_array();
		if(@$_GET['toDate']){
			$data['todate']=$_GET['toDate'];
			$toDate = $_GET['toDate'];
		}else{
			$data['todate']=date('Y-m-d');
			$toDate = date('Y-m-d');;
		}
		if(@$_GET['from']){
			$data['fromDate']=$_GET['from'];
			$from = $_GET['from'];
		}else{
			$data['fromDate']='0000-01-01';
			$from = '0000-01-01';
		}
		

		if(@$_GET['partnerId']){
			if(@$_GET['category']){
				foreach ($tables as $key => $value) {
					if($_GET['category']==$value['Tables_in_test']){
						if(@$_GET['id']){
							$insert['data']=array(
								'id'=>$_GET['id'],
								'table'=>$_GET['category']
							);
							$this->db->select('*');
							$this->db->where('id',$_GET['id']);
							$this->db->limit(1);
							$query = $this->db->get($_GET['category']);
							$data['status']='200';
							$data['item']= $query->row_array();
							
						}else{
							$insert['data']=array(
								'table'=>$_GET['category'],
							);
							$SQL="SELECT * FROM `".$_GET['category']."`WHERE DATE(time) BETWEEN  '".$from."' AND '".$toDate."' ";
							$query = $this->db->query($SQL);        					
							$data['status']='200';
							$data['items']=$query->result_array();
							
						}	
						if($_GET['category']!="logs"){
							$insert['partner']=$_GET['partnerId'];
							$insert['data']=json_encode($insert['data']);
							$this->db->insert('logs',$insert);
						}	
					}
				}
			}else{
				$data['status']="No Records found";
			}
		}else{
			$data['status']="Authentication Error";
		}
		echo json_encode($data);
		
	}

}
