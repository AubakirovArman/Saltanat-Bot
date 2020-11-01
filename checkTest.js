function buttonCheckcom() {
  
  var message = com.getRange("B2").getValue();

  comCommands.message = message;
  comCommands.comCheck();
  message = comCommands.message;
	
  obrabotkaMesageClass(message)
}
