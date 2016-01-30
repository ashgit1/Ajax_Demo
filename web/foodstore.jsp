<%@ page language="java" contentType="text/xml; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>

<%
	//System.out.println("In food.jsp...");
	StringBuffer resXML = new StringBuffer();
	resXML.append("<response>");
	String food = request.getParameter("food");
	String[] foodArray = { "tuna", "bacon", "beef", "loaf" };
	int counter = 0;
	if (food == "") {
		resXML.append("Please enter a food to order...");
	} else {
		for (String item : foodArray) {
			if (food.equalsIgnoreCase(item)) {
				resXML.append("We do have " + food);
				++counter;
			}
		}
		if (counter == 0) {
			resXML.append("Sorry.. We don't server " + food);
		}

	}
	resXML.append("</response>");
	System.out.println("final response: " + resXML.toString());
	//response.setContentType("text/xml");
	response.getWriter().write(resXML.toString());
%>
