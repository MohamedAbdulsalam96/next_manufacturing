// Copyright (c) 2021, Dexciss Technology and contributors
// For license information, please see license.txt

frappe.ui.form.on('Material Produce', {
	 add_details: function(frm) {
	    frappe.call({
            doc: frm.doc,
            method: "set_produce_material",
            callback: function(r) {
                frm.clear_table('material_produce_details');
                frm.reload_doc();
            }
        });
	 }
});

frappe.ui.form.on('Material Produce Item', {
    show_details: function(frm, cdt, cdn) {
        var row = locals[cdt][cdn];
        add_details_line(frm,row)
    },
});

function add_details_line(frm,line_obj){
    frappe.call({
        method: "next_manufacturing.next_manufacturing.doctype.material_produce.material_produce.add_details_line",
        args: {
            line_id: line_obj.name,
            company: frm.doc.company,
            item_code: line_obj.item_code,
            warehouse: line_obj.s_warehouse,
            qty_produced: line_obj.qty_produced,
            data:line_obj.data
        },
        callback: function (r) {
            if(r.message){
                frm.clear_table('material_produce_details');
                for (const d of r.message){
                    var row = frm.add_child('material_produce_details');
                    row.item_code = d.item_code;
                    row.item_name= d.item_name,
                    row.t_warehouse = d.t_warehouse,
                    row.qty_produced = d.qty_produced,
                    row.has_batch_no = d.has_batch_no,
                    row.batch = d.batch,
                    row.rate = d.rate,
                    row.weight = d.weight,
                    row.line_ref = d.line_ref
                }
                frm.refresh_field('material_produce_details');
            }
        }
    });
}
