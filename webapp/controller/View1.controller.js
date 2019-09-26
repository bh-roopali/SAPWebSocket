/*websocket is a protocol for creating a fast two way channel between a web browser and a server. websocket overcomes limitations with http to 
allow for low latency(the delay before a transfer of data begins following an instruction for its transfer) communications between a user 
and a web service,  websocket add flavor to the web by allowing websites to update content without having to wait for the user. unlike 
other techniques wich piggyback on the http protocol, the websocket protocol creates a true ongoing connection between the user and the web service
, allowing information to flow easily between both end points*/
sap.ui.define([
	"sap/ui/core/mvc/Controller",
		"sap/m/MessageBox",
		"com/incture/SAPWebSocket/SAPWebSocket/libs/sockfile",
		"com/incture/SAPWebSocket/SAPWebSocket/libs/stompfile"
], function (Controller,message,SockJS,Stomp) {
	"use strict";
 
	return Controller.extend("com.incture.SAPWebSocket.SAPWebSocket.controller.View1", {
		SockJS : SockJS,
		Stomp : Stomp,
   onInit : function(){
   	var oModel = new sap.ui.model.json.JSONModel();
   	this.getView().setModel(oModel,"oModel");
 var obj = {
	"allocationDto": [{
			"ItemNo": "",
			"SerialNo": ""
		}
	]
};
oModel.setData(obj);
 var tbl = this.getView().byId('idProductsTable');
 var header = tbl.$().find('thead');
       //var socket = new WebSocket('wss://podcddd63e4a.ap1.hana.ondemand.com/MetroData_RestWeb/rest/gs-guide-websocket/websocket');
       var webSocket1 = window.SockJS('https://podcddd63e4a.ap1.hana.ondemand.com/MetroData_RestWeb/rest/gs-guide-websocket');
      /* var socket = window.SockJS('https://podcddd63e4a.ap1.hana.ondemand.com/MetroData_RestWeb/rest/gs-guide-websocket');
       var stompClient = window.Stomp.over(socket);
       stompClient.connect({}, function(frame) {
			//	setConnected(true);
				console.log('Connected: ' + frame);
				stompClient.subscribe('/topic/T001', function(dto) {
				that.showGreeting(dto);

				});
			}); */
			
   },
/*   stompClient.send("/rest/tracking", {}, JSON.stringify({
			'tripId' : 'T002'
		}));*/
   onConnect : function(){
   	var that = this;
   	this.getView().setBusy(true);
   	 var socket = window.SockJS('https://podcddd63e4a.ap1.hana.ondemand.com/MetroData_RestWeb/rest/gs-guide-websocket');
   	  var stompClient = window.Stomp.over(socket);
       stompClient.connect({}, function(frame) {
       	that.getView().setBusy(false);
				sap.m.MessageBox.information(
				"Connection has been stablished");
				stompClient.subscribe('/topic/TRIP18000076', function(dto) {
				that.showGreeting(dto);

				});
			}); 
   },
   showGreeting : function(dto){
   	var a=10;
   	var oModel = this.getView().getModel("oModel");
   	var tblLen = oModel.getData().allocationDto.length;
   	var obj = {};
   	obj.ItemNo = dto.body;
   	obj.SerialNo = tblLen;
   	oModel.getData().allocationDto.push(obj);
   	oModel.refresh(true);
   },
   
   onMessage : function(event) {
  var msg = event.data;
  },
   onSendMsg : function(){
}
	});
});