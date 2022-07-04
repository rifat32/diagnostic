export const printInvoice = (data: any) => {
	let myWindow = window.open("", "", "width=999,height=999");
	myWindow?.document.write(data);

	myWindow?.document.close(); //missing code

	myWindow?.focus();
	myWindow?.print();
};
