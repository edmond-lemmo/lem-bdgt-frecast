import { useState, useEffect, useMemo, useRef, useCallback } from "react";

/* Starting data: rules and history imported from Budget_2026.xlsx. After that,
   everything lives in this app. */
const SEED = {"v":3,"updated":1789219670618,"anchor":{"d":"2026-09-12","ts":1789219670618,"spending":5.15,"savings":4006.48,"confirmed":false},"logs":[{"id":"hdu","d":"2026-05-01","c":"Petrol","a":74.55,"n":"Fuel","t":"spend","ts":0},{"id":"hdv","d":"2026-05-01","c":"Vape","a":66.07,"n":"Vape","t":"spend","ts":0},{"id":"hdw","d":"2026-05-01","c":"Everyday","a":20,"n":"Lunch","t":"spend","ts":0},{"id":"hdx","d":"2026-05-01","c":"Everyday","a":5.95,"n":"Coffee","t":"spend","ts":0},{"id":"hdy","d":"2026-05-01","c":"Other","a":3,"n":"Brigid Transfer","t":"spend","ts":0},{"id":"hdz","d":"2026-05-01","c":"Groceries","a":30.6,"n":"Coles","t":"spend","ts":0},{"id":"hdp","d":"2026-05-02","c":"Everyday","a":46.69,"n":"Hot springs","t":"spend","ts":0},{"id":"hdq","d":"2026-05-02","c":"Everyday","a":34.51,"n":"Hot Springs Food","t":"spend","ts":0},{"id":"hdr","d":"2026-05-02","c":"Everyday","a":12.45,"n":"KFC","t":"spend","ts":0},{"id":"hds","d":"2026-05-02","c":"Other","a":83.9,"n":"Bday Cake","t":"spend","ts":0},{"id":"hdt","d":"2026-05-02","c":"Groceries","a":149.67,"n":"Weekly shop","t":"spend","ts":0},{"id":"hdm","d":"2026-05-03","c":"Money in","a":40,"n":"Bday Cake Flo","t":"in","ts":0},{"id":"hdn","d":"2026-05-03","c":"Other","a":109.91,"n":"Anglers Drinks","t":"spend","ts":0},{"id":"hdo","d":"2026-05-03","c":"Everyday","a":17,"n":"Golf","t":"spend","ts":0},{"id":"hdi","d":"2026-05-04","c":"Money in","a":100,"n":"Cash from dad","t":"in","ts":0},{"id":"hdj","d":"2026-05-04","c":"Gift","a":227.36,"n":"Bday Dinner","t":"spend","ts":0},{"id":"hdk","d":"2026-05-04","c":"Money in","a":112.5,"n":"Transfer Flo","t":"in","ts":0},{"id":"hdl","d":"2026-05-04","c":"Everyday","a":7.9,"n":"Starbucks","t":"spend","ts":0},{"id":"hdd","d":"2026-05-06","c":"Money in","a":144.75,"n":"Transfer for BNPL","t":"in","ts":0},{"id":"hde","d":"2026-05-06","c":"Groceries","a":7.49,"n":"Chemist Warehouse","t":"spend","ts":0},{"id":"hdf","d":"2026-05-06","c":"Petrol","a":29,"n":"Brigid Fuel","t":"spend","ts":0},{"id":"hdg","d":"2026-05-06","c":"Everyday","a":5.95,"n":"Coffee","t":"spend","ts":0},{"id":"hdh","d":"2026-05-06","c":"Everyday","a":5.3,"n":"Coffee","t":"spend","ts":0},{"id":"hd6","d":"2026-05-07","c":"Money in","a":5,"n":"Parking","t":"in","ts":0},{"id":"hd7","d":"2026-05-07","c":"Everyday","a":5,"n":"Coffee","t":"spend","ts":0},{"id":"hd8","d":"2026-05-07","c":"Groceries","a":41.95,"n":"Woolies","t":"spend","ts":0},{"id":"hd9","d":"2026-05-07","c":"Everyday","a":70.64,"n":"Dinner","t":"spend","ts":0},{"id":"hda","d":"2026-05-07","c":"Everyday","a":16.98,"n":"Chemist Warehouse","t":"spend","ts":0},{"id":"hdb","d":"2026-05-07","c":"Everyday","a":17.5,"n":"Lunch","t":"spend","ts":0},{"id":"hdc","d":"2026-05-07","c":"Everyday","a":56.52,"n":"Eyebrows","t":"spend","ts":0},{"id":"hcz","d":"2026-05-08","c":"Money in","a":145,"n":"Car Insurance","t":"in","ts":0},{"id":"hd0","d":"2026-05-08","c":"Money in","a":24.19,"n":"Parking","t":"in","ts":0},{"id":"hd1","d":"2026-05-08","c":"Money in","a":98,"n":"Internet","t":"in","ts":0},{"id":"hd2","d":"2026-05-08","c":"Everyday","a":15.6,"n":"Airport Snacks","t":"spend","ts":0},{"id":"hd3","d":"2026-05-08","c":"Everyday","a":30.15,"n":"Maccas","t":"spend","ts":0},{"id":"hd4","d":"2026-05-08","c":"Everyday","a":6.9,"n":"Lunch","t":"spend","ts":0},{"id":"hd5","d":"2026-05-08","c":"Everyday","a":6.5,"n":"Coffee","t":"spend","ts":0},{"id":"hcx","d":"2026-05-09","c":"Everyday","a":5.5,"n":"Ice Cream","t":"spend","ts":0},{"id":"hcy","d":"2026-05-09","c":"Everyday","a":20.5,"n":"Coffee","t":"spend","ts":0},{"id":"hcq","d":"2026-05-10","c":"Everyday","a":38.6,"n":"Dinner","t":"spend","ts":0},{"id":"hcr","d":"2026-05-10","c":"Petrol","a":30,"n":"Fuel Brigid","t":"spend","ts":0},{"id":"hcs","d":"2026-05-10","c":"Everyday","a":15.71,"n":"Airport Snacks","t":"spend","ts":0},{"id":"hct","d":"2026-05-10","c":"Money in","a":20,"n":"Airport Snacks","t":"in","ts":0},{"id":"hcu","d":"2026-05-10","c":"Everyday","a":91.65,"n":"Big W","t":"spend","ts":0},{"id":"hcv","d":"2026-05-10","c":"Money in","a":90,"n":"Big W","t":"in","ts":0},{"id":"hcw","d":"2026-05-10","c":"Everyday","a":14.23,"n":"Coffee","t":"spend","ts":0},{"id":"hci","d":"2026-05-11","c":"Everyday","a":28.6,"n":"Golf","t":"spend","ts":0},{"id":"hcj","d":"2026-05-11","c":"Groceries","a":130.16,"n":"Coles","t":"spend","ts":0},{"id":"hck","d":"2026-05-11","c":"Everyday","a":6.5,"n":"Coffee","t":"spend","ts":0},{"id":"hcl","d":"2026-05-11","c":"Money in","a":24.19,"n":"Parking","t":"in","ts":0},{"id":"hcm","d":"2026-05-11","c":"Money in","a":28.6,"n":"Golf","t":"in","ts":0},{"id":"hcn","d":"2026-05-11","c":"Money in","a":30,"n":"Fuel","t":"in","ts":0},{"id":"hco","d":"2026-05-11","c":"Money in","a":130,"n":"Groceries","t":"in","ts":0},{"id":"hcp","d":"2026-05-11","c":"Money in","a":39,"n":"Dinner","t":"in","ts":0},{"id":"hc9","d":"2026-05-12","c":"Money in","a":15,"n":"Cad Wash","t":"in","ts":0},{"id":"hca","d":"2026-05-12","c":"Money in","a":24.19,"n":"Parking","t":"in","ts":0},{"id":"hcb","d":"2026-05-12","c":"Money in","a":8,"n":"Coffee","t":"in","ts":0},{"id":"hcc","d":"2026-05-12","c":"Money in","a":13,"n":"Laundromat","t":"in","ts":0},{"id":"hcd","d":"2026-05-12","c":"Everyday","a":6,"n":"Laundromat","t":"spend","ts":0},{"id":"hce","d":"2026-05-12","c":"Everyday","a":15.2,"n":"Car Wah","t":"spend","ts":0},{"id":"hcf","d":"2026-05-12","c":"Everyday","a":7.6,"n":"Coffee","t":"spend","ts":0},{"id":"hcg","d":"2026-05-12","c":"Everyday","a":12,"n":"Laundromat","t":"spend","ts":0},{"id":"hch","d":"2026-05-12","c":"Everyday","a":6.5,"n":"Coffee","t":"spend","ts":0},{"id":"hbz","d":"2026-05-13","c":"Money in","a":5,"n":"Parking","t":"in","ts":0},{"id":"hc0","d":"2026-05-13","c":"Money in","a":16,"n":"YouTube","t":"in","ts":0},{"id":"hc1","d":"2026-05-13","c":"From savings","a":10,"n":"","t":"fromSav","ts":0},{"id":"hc2","d":"2026-05-13","c":"From savings","a":12,"n":"","t":"fromSav","ts":0},{"id":"hc3","d":"2026-05-13","c":"From savings","a":7,"n":"","t":"fromSav","ts":0},{"id":"hc4","d":"2026-05-13","c":"From savings","a":50,"n":"","t":"fromSav","ts":0},{"id":"hc5","d":"2026-05-13","c":"Everyday","a":6,"n":"Laundromat","t":"spend","ts":0},{"id":"hc6","d":"2026-05-13","c":"Everyday","a":12,"n":"Laundromat","t":"spend","ts":0},{"id":"hc7","d":"2026-05-13","c":"Everyday","a":5.3,"n":"Coffee","t":"spend","ts":0},{"id":"hc8","d":"2026-05-13","c":"Everyday","a":5.95,"n":"Coffee","t":"spend","ts":0},{"id":"hbv","d":"2026-05-14","c":"Vape","a":62,"n":"Vape","t":"spend","ts":0},{"id":"hbw","d":"2026-05-14","c":"Everyday","a":2.2,"n":"Drink","t":"spend","ts":0},{"id":"hbx","d":"2026-05-14","c":"Everyday","a":5.95,"n":"Coffee","t":"spend","ts":0},{"id":"hby","d":"2026-05-14","c":"Everyday","a":5.3,"n":"Coffee","t":"spend","ts":0},{"id":"hbn","d":"2026-05-15","c":"Everyday","a":16.4,"n":"Pizza Hut","t":"spend","ts":0},{"id":"hbo","d":"2026-05-15","c":"Everyday","a":21.95,"n":"Maccas","t":"spend","ts":0},{"id":"hbp","d":"2026-05-15","c":"Groceries","a":226.74,"n":"Coles","t":"spend","ts":0},{"id":"hbq","d":"2026-05-15","c":"Everyday","a":5.3,"n":"Coffee","t":"spend","ts":0},{"id":"hbr","d":"2026-05-15","c":"Everyday","a":5.95,"n":"Coffee","t":"spend","ts":0},{"id":"hbs","d":"2026-05-15","c":"Everyday","a":7.9,"n":"Lunch","t":"spend","ts":0},{"id":"hbt","d":"2026-05-15","c":"Everyday","a":8.51,"n":"Lunch","t":"spend","ts":0},{"id":"hbu","d":"2026-05-15","c":"Everyday","a":10.67,"n":"Lunch","t":"spend","ts":0},{"id":"hbj","d":"2026-05-16","c":"Petrol","a":81.91,"n":"Fuel","t":"spend","ts":0},{"id":"hbk","d":"2026-05-16","c":"Everyday","a":27.64,"n":"Chemist Warehouse","t":"spend","ts":0},{"id":"hbl","d":"2026-05-16","c":"Everyday","a":59.71,"n":"Breakfast","t":"spend","ts":0},{"id":"hbm","d":"2026-05-16","c":"Petrol","a":43.5,"n":"Petrol","t":"spend","ts":0},{"id":"hbe","d":"2026-05-17","c":"Everyday","a":32.75,"n":"Maccas","t":"spend","ts":0},{"id":"hbf","d":"2026-05-17","c":"Everyday","a":13.68,"n":"Coffee","t":"spend","ts":0},{"id":"hbg","d":"2026-05-17","c":"Groceries","a":39.55,"n":"Coles","t":"spend","ts":0},{"id":"hbh","d":"2026-05-17","c":"Money in","a":25,"n":"Transfer from Paul","t":"in","ts":0},{"id":"hbi","d":"2026-05-17","c":"Everyday","a":50,"n":"Cart Golf","t":"spend","ts":0},{"id":"hbc","d":"2026-05-18","c":"Everyday","a":5.3,"n":"Coffee","t":"spend","ts":0},{"id":"hbd","d":"2026-05-18","c":"Parking","a":24.19,"n":"Brigid Parking","t":"spend","ts":0},{"id":"hba","d":"2026-05-19","c":"Everyday","a":5.5,"n":"Coffee","t":"spend","ts":0},{"id":"hbb","d":"2026-05-19","c":"Everyday","a":5.3,"n":"Coffee","t":"spend","ts":0},{"id":"hb5","d":"2026-05-20","c":"Everyday","a":13.95,"n":"Krispy Kreme","t":"spend","ts":0},{"id":"hb6","d":"2026-05-20","c":"Everyday","a":2.2,"n":"Drink","t":"spend","ts":0},{"id":"hb7","d":"2026-05-20","c":"Everyday","a":11.8,"n":"Coffee","t":"spend","ts":0},{"id":"hb8","d":"2026-05-20","c":"Everyday","a":5.95,"n":"Coffee","t":"spend","ts":0},{"id":"hb9","d":"2026-05-20","c":"Money in","a":130,"n":"Brigid Super","t":"in","ts":0},{"id":"hb1","d":"2026-05-21","c":"Everyday","a":15.8,"n":"Lunch","t":"spend","ts":0},{"id":"hb2","d":"2026-05-21","c":"Everyday","a":9.96,"n":"Lunch","t":"spend","ts":0},{"id":"hb3","d":"2026-05-21","c":"Everyday","a":5.3,"n":"Coffee","t":"spend","ts":0},{"id":"hb4","d":"2026-05-21","c":"Everyday","a":5.95,"n":"Coffee","t":"spend","ts":0},{"id":"hav","d":"2026-05-22","c":"Everyday","a":14.95,"n":"Maccas","t":"spend","ts":0},{"id":"haw","d":"2026-05-22","c":"Everyday","a":16.4,"n":"Pizza Hut","t":"spend","ts":0},{"id":"hax","d":"2026-05-22","c":"Everyday","a":7.9,"n":"Lunch","t":"spend","ts":0},{"id":"hay","d":"2026-05-22","c":"Everyday","a":75,"n":"Golf","t":"spend","ts":0},{"id":"haz","d":"2026-05-22","c":"Everyday","a":5.3,"n":"Coffee","t":"spend","ts":0},{"id":"hb0","d":"2026-05-22","c":"Everyday","a":5.95,"n":"Coffee","t":"spend","ts":0},{"id":"has","d":"2026-05-23","c":"Groceries","a":77.99,"n":"Coles","t":"spend","ts":0},{"id":"hat","d":"2026-05-23","c":"Groceries","a":39.1,"n":"Lamanna","t":"spend","ts":0},{"id":"hau","d":"2026-05-23","c":"Everyday","a":54.12,"n":"Breakfast","t":"spend","ts":0},{"id":"ham","d":"2026-05-24","c":"Other","a":80.95,"n":"Wedding Save the Date","t":"spend","ts":0},{"id":"han","d":"2026-05-24","c":"Everyday","a":6.59,"n":"Doughnut","t":"spend","ts":0},{"id":"hao","d":"2026-05-24","c":"Everyday","a":38,"n":"Maccas","t":"spend","ts":0},{"id":"hap","d":"2026-05-24","c":"Everyday","a":122.15,"n":"Kmart","t":"spend","ts":0},{"id":"haq","d":"2026-05-24","c":"Groceries","a":149.07,"n":"Coles","t":"spend","ts":0},{"id":"har","d":"2026-05-24","c":"Everyday","a":13.48,"n":"Coffee","t":"spend","ts":0},{"id":"hak","d":"2026-05-25","c":"Everyday","a":6.5,"n":"Coffee","t":"spend","ts":0},{"id":"hal","d":"2026-05-25","c":"Other Subs","a":2.99,"n":"App Store Sub","t":"spend","ts":0},{"id":"hah","d":"2026-05-26","c":"Groceries","a":9.8,"n":"Coles","t":"spend","ts":0},{"id":"hai","d":"2026-05-26","c":"Everyday","a":2.2,"n":"Coke","t":"spend","ts":0},{"id":"haj","d":"2026-05-26","c":"Everyday","a":6.1,"n":"Coffee","t":"spend","ts":0},{"id":"hae","d":"2026-05-27","c":"Everyday","a":5.3,"n":"Coffee","t":"spend","ts":0},{"id":"haf","d":"2026-05-27","c":"Everyday","a":49.95,"n":"Doctors Script","t":"spend","ts":0},{"id":"hag","d":"2026-05-27","c":"Vape","a":66.07,"n":"Vape","t":"spend","ts":0},{"id":"ha8","d":"2026-05-28","c":"Money in","a":125,"n":"Dinner","t":"in","ts":0},{"id":"ha9","d":"2026-05-28","c":"Everyday","a":106.58,"n":"Dinner","t":"spend","ts":0},{"id":"haa","d":"2026-05-28","c":"Petrol","a":50.62,"n":"Fuel Edmond","t":"spend","ts":0},{"id":"hab","d":"2026-05-28","c":"Everyday","a":6.1,"n":"Coffee","t":"spend","ts":0},{"id":"hac","d":"2026-05-28","c":"Everyday","a":5.3,"n":"Coffee","t":"spend","ts":0},{"id":"had","d":"2026-05-28","c":"Other Subs","a":47.48,"n":"ChatGPT","t":"spend","ts":0},{"id":"ha2","d":"2026-05-29","c":"Everyday","a":15,"n":"Transfer Paul","t":"spend","ts":0},{"id":"ha3","d":"2026-05-29","c":"Everyday","a":6.95,"n":"Maccas","t":"spend","ts":0},{"id":"ha4","d":"2026-05-29","c":"Everyday","a":22.15,"n":"Maccas","t":"spend","ts":0},{"id":"ha5","d":"2026-05-29","c":"Everyday","a":6.5,"n":"Coffee","t":"spend","ts":0},{"id":"ha6","d":"2026-05-29","c":"Everyday","a":5.95,"n":"Coffee","t":"spend","ts":0},{"id":"ha7","d":"2026-05-29","c":"Parking","a":24.19,"n":"Parking","t":"spend","ts":0},{"id":"h9s","d":"2026-05-30","c":"Groceries","a":185.98,"n":"Coles","t":"spend","ts":0},{"id":"h9t","d":"2026-05-30","c":"Everyday","a":52.63,"n":"Lunch","t":"spend","ts":0},{"id":"h9u","d":"2026-05-30","c":"Parking","a":0.01,"n":"Wilson","t":"spend","ts":0},{"id":"h9v","d":"2026-05-30","c":"Everyday","a":15.75,"n":"Shop signage for dad","t":"spend","ts":0},{"id":"h9w","d":"2026-05-30","c":"Everyday","a":0.25,"n":"Shop signage for dad","t":"spend","ts":0},{"id":"h9x","d":"2026-05-30","c":"Everyday","a":30.14,"n":"Lunch","t":"spend","ts":0},{"id":"h9y","d":"2026-05-30","c":"Everyday","a":25.3,"n":"Lunch","t":"spend","ts":0},{"id":"h9z","d":"2026-05-30","c":"Groceries","a":8.65,"n":"Woolies","t":"spend","ts":0},{"id":"ha0","d":"2026-05-30","c":"Parking","a":20,"n":"QV","t":"spend","ts":0},{"id":"ha1","d":"2026-05-30","c":"Everyday","a":7.75,"n":"Coffee","t":"spend","ts":0},{"id":"h9o","d":"2026-05-31","c":"Everyday","a":19.98,"n":"Chemist Warehouse","t":"spend","ts":0},{"id":"h9p","d":"2026-05-31","c":"Petrol","a":57.19,"n":"Edmond Fuel","t":"spend","ts":0},{"id":"h9q","d":"2026-05-31","c":"Money in","a":28,"n":"Golf Cart Paul","t":"in","ts":0},{"id":"h9r","d":"2026-05-31","c":"Everyday","a":60.99,"n":"Golf Cart","t":"spend","ts":0},{"id":"h9n","d":"2026-06-01","c":"Everyday","a":5.95,"n":"Coffee","t":"spend","ts":0},{"id":"h9i","d":"2026-06-02","c":"Everyday","a":5.95,"n":"Coffee","t":"spend","ts":0},{"id":"h9j","d":"2026-06-02","c":"Groceries","a":15.5,"n":"Coles","t":"spend","ts":0},{"id":"h9k","d":"2026-06-02","c":"Everyday","a":6.6,"n":"Drink","t":"spend","ts":0},{"id":"h9l","d":"2026-06-02","c":"Everyday","a":5.3,"n":"Coffee","t":"spend","ts":0},{"id":"h9m","d":"2026-06-02","c":"Everyday","a":15.18,"n":"Lunch","t":"spend","ts":0},{"id":"h9c","d":"2026-06-03","c":"Everyday","a":6.2,"n":"Car Wash","t":"spend","ts":0},{"id":"h9d","d":"2026-06-03","c":"Money in","a":186.14,"n":"Rego rebate","t":"in","ts":0},{"id":"h9e","d":"2026-06-03","c":"Money in","a":186.14,"n":"Rego rebate","t":"in","ts":0},{"id":"h9f","d":"2026-06-03","c":"Groceries","a":60.35,"n":"Coles","t":"spend","ts":0},{"id":"h9g","d":"2026-06-03","c":"Everyday","a":5.95,"n":"Coffee","t":"spend","ts":0},{"id":"h9h","d":"2026-06-03","c":"Everyday","a":5.3,"n":"Coffee","t":"spend","ts":0},{"id":"h98","d":"2026-06-04","c":"Money in","a":200,"n":"Money for Bridie","t":"in","ts":0},{"id":"h99","d":"2026-06-04","c":"Everyday","a":6.1,"n":"Coffee","t":"spend","ts":0},{"id":"h9a","d":"2026-06-04","c":"Groceries","a":149,"n":"Woolies","t":"spend","ts":0},{"id":"h9b","d":"2026-06-04","c":"Everyday","a":34.4,"n":"Maccas","t":"spend","ts":0},{"id":"h93","d":"2026-06-05","c":"Everyday","a":5.15,"n":"Maccas","t":"spend","ts":0},{"id":"h94","d":"2026-06-05","c":"Vape","a":66.04,"n":"Vape","t":"spend","ts":0},{"id":"h95","d":"2026-06-05","c":"Everyday","a":7.9,"n":"Lunch","t":"spend","ts":0},{"id":"h96","d":"2026-06-05","c":"Everyday","a":10,"n":"Hannah Gift","t":"spend","ts":0},{"id":"h97","d":"2026-06-05","c":"Everyday","a":6.5,"n":"Coffee","t":"spend","ts":0},{"id":"h8y","d":"2026-06-06","c":"Everyday","a":37.19,"n":"Yochi","t":"spend","ts":0},{"id":"h8z","d":"2026-06-06","c":"Parking","a":12.3,"n":"District Docklands Parking","t":"spend","ts":0},{"id":"h90","d":"2026-06-06","c":"Everyday","a":5,"n":"Archie Brothers","t":"spend","ts":0},{"id":"h91","d":"2026-06-06","c":"Everyday","a":14.6,"n":"Maccas","t":"spend","ts":0},{"id":"h92","d":"2026-06-06","c":"Everyday","a":45,"n":"Golf","t":"spend","ts":0},{"id":"h8o","d":"2026-06-07","c":"Money in","a":100,"n":"Bridie","t":"in","ts":0},{"id":"h8p","d":"2026-06-07","c":"Money in","a":115,"n":"Madeleine share dinner","t":"in","ts":0},{"id":"h8q","d":"2026-06-07","c":"Money in","a":115,"n":"Paul Share Dinner","t":"in","ts":0},{"id":"h8r","d":"2026-06-07","c":"Money in","a":474,"n":"Transfer for Essendon Hotel","t":"in","ts":0},{"id":"h8s","d":"2026-06-07","c":"Other","a":459.22,"n":"Essendon Hotel","t":"spend","ts":0},{"id":"h8t","d":"2026-06-07","c":"Everyday","a":70,"n":"Mecca","t":"spend","ts":0},{"id":"h8u","d":"2026-06-07","c":"Money in","a":45,"n":"Golf Cart Hire","t":"in","ts":0},{"id":"h8v","d":"2026-06-07","c":"Parking","a":27.49,"n":"QV","t":"spend","ts":0},{"id":"h8w","d":"2026-06-07","c":"Other","a":45.68,"n":"Bridie Spending","t":"spend","ts":0},{"id":"h8x","d":"2026-06-07","c":"Everyday","a":45,"n":"Golf Cart Hire","t":"spend","ts":0},{"id":"h8k","d":"2026-06-08","c":"Everyday","a":17,"n":"Face wash","t":"spend","ts":0},{"id":"h8l","d":"2026-06-08","c":"Everyday","a":93,"n":"Baby Shower","t":"spend","ts":0},{"id":"h8m","d":"2026-06-08","c":"Groceries","a":130.45,"n":"Coles","t":"spend","ts":0},{"id":"h8n","d":"2026-06-08","c":"Everyday","a":48.92,"n":"Coffee Pastries","t":"spend","ts":0},{"id":"h8i","d":"2026-06-09","c":"Everyday","a":5.95,"n":"Coffee","t":"spend","ts":0},{"id":"h8j","d":"2026-06-09","c":"Everyday","a":5.3,"n":"Coffee","t":"spend","ts":0},{"id":"h8a","d":"2026-06-10","c":"Everyday","a":10.99,"n":"Chemist","t":"spend","ts":0},{"id":"h8b","d":"2026-06-10","c":"Money in","a":60,"n":"DiDi","t":"in","ts":0},{"id":"h8c","d":"2026-06-10","c":"Money in","a":325,"n":"Car Battery","t":"in","ts":0},{"id":"h8d","d":"2026-06-10","c":"Everyday","a":325,"n":"Car Battery","t":"spend","ts":0},{"id":"h8e","d":"2026-06-10","c":"Everyday","a":6.6,"n":"Coffee","t":"spend","ts":0},{"id":"h8f","d":"2026-06-10","c":"Everyday","a":1,"n":"Myki","t":"spend","ts":0},{"id":"h8g","d":"2026-06-10","c":"Everyday","a":3.37,"n":"Didi","t":"spend","ts":0},{"id":"h8h","d":"2026-06-10","c":"Everyday","a":50.68,"n":"DiDi","t":"spend","ts":0},{"id":"h86","d":"2026-06-11","c":"Groceries","a":55.25,"n":"Coles","t":"spend","ts":0},{"id":"h87","d":"2026-06-11","c":"Everyday","a":2.2,"n":"Drink","t":"spend","ts":0},{"id":"h88","d":"2026-06-11","c":"Everyday","a":12.29,"n":"Coffee","t":"spend","ts":0},{"id":"h89","d":"2026-06-11","c":"Everyday","a":5.95,"n":"Coffee","t":"spend","ts":0},{"id":"h80","d":"2026-06-12","c":"Everyday","a":93.37,"n":"Car Payment Extra","t":"spend","ts":0},{"id":"h81","d":"2026-06-12","c":"Everyday","a":5.3,"n":"Coffee","t":"spend","ts":0},{"id":"h82","d":"2026-06-12","c":"Everyday","a":5.95,"n":"Coffee","t":"spend","ts":0},{"id":"h83","d":"2026-06-12","c":"Groceries","a":3.55,"n":"Milk","t":"spend","ts":0},{"id":"h84","d":"2026-06-12","c":"Everyday","a":14.65,"n":"Coffee","t":"spend","ts":0},{"id":"h85","d":"2026-06-12","c":"Everyday","a":40.15,"n":"Maccas","t":"spend","ts":0},{"id":"h7w","d":"2026-06-13","c":"Everyday","a":83.7,"n":"Rice Fields","t":"spend","ts":0},{"id":"h7x","d":"2026-06-13","c":"Vape","a":66.07,"n":"Vape","t":"spend","ts":0},{"id":"h7y","d":"2026-06-13","c":"Groceries","a":161.94,"n":"Coles","t":"spend","ts":0},{"id":"h7z","d":"2026-06-13","c":"Everyday","a":18.77,"n":"Coffee","t":"spend","ts":0},{"id":"h7s","d":"2026-06-14","c":"Everyday","a":41.25,"n":"Kmart","t":"spend","ts":0},{"id":"h7t","d":"2026-06-14","c":"Everyday","a":33.98,"n":"Miffy Books","t":"spend","ts":0},{"id":"h7u","d":"2026-06-14","c":"Everyday","a":16.85,"n":"Food","t":"spend","ts":0},{"id":"h7v","d":"2026-06-14","c":"Everyday","a":27.34,"n":"YoChi","t":"spend","ts":0},{"id":"h7p","d":"2026-06-15","c":"Groceries","a":27.5,"n":"Coles","t":"spend","ts":0},{"id":"h7q","d":"2026-06-15","c":"Everyday","a":6.5,"n":"Coffee","t":"spend","ts":0},{"id":"h7r","d":"2026-06-15","c":"Everyday","a":62,"n":"Amazon","t":"spend","ts":0},{"id":"h7l","d":"2026-06-16","c":"Groceries","a":26.65,"n":"Coles","t":"spend","ts":0},{"id":"h7m","d":"2026-06-16","c":"Money in","a":20,"n":"Linkt","t":"in","ts":0},{"id":"h7n","d":"2026-06-16","c":"Everyday","a":6.6,"n":"Coffee","t":"spend","ts":0},{"id":"h7o","d":"2026-06-16","c":"Everyday","a":6.5,"n":"Coffee","t":"spend","ts":0},{"id":"h7i","d":"2026-06-17","c":"Everyday","a":1,"n":"Test","t":"spend","ts":0},{"id":"h7j","d":"2026-06-17","c":"Everyday","a":14.29,"n":"Coffee","t":"spend","ts":0},{"id":"h7k","d":"2026-06-17","c":"Everyday","a":45,"n":"Golf","t":"spend","ts":0},{"id":"h7d","d":"2026-06-18","c":"Everyday","a":30.75,"n":"Parking","t":"spend","ts":0},{"id":"h7e","d":"2026-06-18","c":"Everyday","a":12.99,"n":"Lunch","t":"spend","ts":0},{"id":"h7f","d":"2026-06-18","c":"Everyday","a":7.5,"n":"Coffee","t":"spend","ts":0},{"id":"h7g","d":"2026-06-18","c":"Groceries","a":38.65,"n":"Coles","t":"spend","ts":0},{"id":"h7h","d":"2026-06-18","c":"Petrol","a":83.07,"n":"Petrol","t":"spend","ts":0},{"id":"h76","d":"2026-06-19","c":"Everyday","a":30.1,"n":"Maccas","t":"spend","ts":0},{"id":"h77","d":"2026-06-19","c":"Everyday","a":2,"n":"Parking","t":"spend","ts":0},{"id":"h78","d":"2026-06-19","c":"Everyday","a":7.9,"n":"Lunch","t":"spend","ts":0},{"id":"h79","d":"2026-06-19","c":"Everyday","a":9.75,"n":"Lunch","t":"spend","ts":0},{"id":"h7a","d":"2026-06-19","c":"Everyday","a":2.1,"n":"Drink","t":"spend","ts":0},{"id":"h7b","d":"2026-06-19","c":"Everyday","a":5.3,"n":"Coffee","t":"spend","ts":0},{"id":"h7c","d":"2026-06-19","c":"Everyday","a":5.95,"n":"Coffee","t":"spend","ts":0},{"id":"h70","d":"2026-06-20","c":"Everyday","a":30,"n":"Amazon","t":"spend","ts":0},{"id":"h71","d":"2026-06-20","c":"Everyday","a":2,"n":"Maccas","t":"spend","ts":0},{"id":"h72","d":"2026-06-20","c":"Groceries","a":27.7,"n":"Coles","t":"spend","ts":0},{"id":"h73","d":"2026-06-20","c":"Groceries","a":224.75,"n":"Coles","t":"spend","ts":0},{"id":"h74","d":"2026-06-20","c":"Everyday","a":18.25,"n":"Officeworks","t":"spend","ts":0},{"id":"h75","d":"2026-06-20","c":"Everyday","a":12.49,"n":"Coffee","t":"spend","ts":0},{"id":"h6v","d":"2026-06-21","c":"Everyday","a":33,"n":"Golf","t":"spend","ts":0},{"id":"h6w","d":"2026-06-21","c":"Everyday","a":12.41,"n":"Coffee","t":"spend","ts":0},{"id":"h6x","d":"2026-06-21","c":"Everyday","a":36,"n":"Kmart Home Office","t":"spend","ts":0},{"id":"h6y","d":"2026-06-21","c":"Everyday","a":95.76,"n":"Nails","t":"spend","ts":0},{"id":"h6z","d":"2026-06-21","c":"Everyday","a":56.52,"n":"Eyebrows","t":"spend","ts":0},{"id":"h6u","d":"2026-06-22","c":"Everyday","a":6.5,"n":"Coffee","t":"spend","ts":0},{"id":"h6n","d":"2026-06-23","c":"Groceries","a":17.55,"n":"Coles","t":"spend","ts":0},{"id":"h6o","d":"2026-06-23","c":"Everyday","a":8.1,"n":"Snack","t":"spend","ts":0},{"id":"h6p","d":"2026-06-23","c":"Everyday","a":68,"n":"Stamps","t":"spend","ts":0},{"id":"h6q","d":"2026-06-23","c":"Everyday","a":1.2,"n":"Car Wash","t":"spend","ts":0},{"id":"h6r","d":"2026-06-23","c":"Everyday","a":10.2,"n":"Car Wash","t":"spend","ts":0},{"id":"h6s","d":"2026-06-23","c":"Everyday","a":36.98,"n":"Chemist Warehouse","t":"spend","ts":0},{"id":"h6t","d":"2026-06-23","c":"Everyday","a":6.5,"n":"Coffee","t":"spend","ts":0},{"id":"h6h","d":"2026-06-24","c":"Everyday","a":12,"n":"Night Market","t":"spend","ts":0},{"id":"h6i","d":"2026-06-24","c":"Everyday","a":31,"n":"Night Market","t":"spend","ts":0},{"id":"h6j","d":"2026-06-24","c":"Everyday","a":57.52,"n":"Night Market","t":"spend","ts":0},{"id":"h6k","d":"2026-06-24","c":"Everyday","a":26,"n":"Night Market","t":"spend","ts":0},{"id":"h6l","d":"2026-06-24","c":"Everyday","a":24.43,"n":"Night Market","t":"spend","ts":0},{"id":"h6m","d":"2026-06-24","c":"Vape","a":66.04,"n":"Vape","t":"spend","ts":0},{"id":"h6c","d":"2026-06-25","c":"Groceries","a":11,"n":"Coles","t":"spend","ts":0},{"id":"h6d","d":"2026-06-25","c":"Groceries","a":77.2,"n":"Coles","t":"spend","ts":0},{"id":"h6e","d":"2026-06-25","c":"Everyday","a":9.55,"n":"Lunch","t":"spend","ts":0},{"id":"h6f","d":"2026-06-25","c":"Everyday","a":5.95,"n":"Coffee","t":"spend","ts":0},{"id":"h6g","d":"2026-06-25","c":"Everyday","a":5.3,"n":"Coffee","t":"spend","ts":0},{"id":"h64","d":"2026-06-26","c":"Groceries","a":214.92,"n":"Coles","t":"spend","ts":0},{"id":"h65","d":"2026-06-26","c":"Everyday","a":19.82,"n":"Pizza","t":"spend","ts":0},{"id":"h66","d":"2026-06-26","c":"Everyday","a":23.15,"n":"Maccas","t":"spend","ts":0},{"id":"h67","d":"2026-06-26","c":"Everyday","a":10,"n":"Bunnings","t":"spend","ts":0},{"id":"h68","d":"2026-06-26","c":"Everyday","a":2.1,"n":"Drink","t":"spend","ts":0},{"id":"h69","d":"2026-06-26","c":"Everyday","a":15.85,"n":"Lunch","t":"spend","ts":0},{"id":"h6a","d":"2026-06-26","c":"Everyday","a":6,"n":"Coffee","t":"spend","ts":0},{"id":"h6b","d":"2026-06-26","c":"Everyday","a":6,"n":"Coffee","t":"spend","ts":0},{"id":"h61","d":"2026-06-27","c":"Everyday","a":19.87,"n":"Coffee","t":"spend","ts":0},{"id":"h62","d":"2026-06-27","c":"Everyday","a":21.25,"n":"Maccas","t":"spend","ts":0},{"id":"h63","d":"2026-06-27","c":"Everyday","a":22,"n":"Carlton Shop","t":"spend","ts":0},{"id":"h5t","d":"2026-06-28","c":"Everyday","a":48,"n":"Golf Cart","t":"spend","ts":0},{"id":"h5u","d":"2026-06-28","c":"Everyday","a":73,"n":"Mecca","t":"spend","ts":0},{"id":"h5v","d":"2026-06-28","c":"Everyday","a":30,"n":"Ugg boots","t":"spend","ts":0},{"id":"h5w","d":"2026-06-28","c":"Everyday","a":17.89,"n":"Lunch","t":"spend","ts":0},{"id":"h5x","d":"2026-06-28","c":"Everyday","a":6.2,"n":"Car Wash","t":"spend","ts":0},{"id":"h5y","d":"2026-06-28","c":"Petrol","a":60.04,"n":"Petrol","t":"spend","ts":0},{"id":"h5z","d":"2026-06-28","c":"Money in","a":24,"n":"Golf Cart","t":"in","ts":0},{"id":"h60","d":"2026-06-28","c":"Other Subs","a":29.99,"n":"ChatGPT","t":"spend","ts":0},{"id":"h5q","d":"2026-06-29","c":"Everyday","a":6.5,"n":"Coffee","t":"spend","ts":0},{"id":"h5r","d":"2026-06-29","c":"Everyday","a":19.98,"n":"Amazon","t":"spend","ts":0},{"id":"h5s","d":"2026-06-29","c":"Parking","a":24,"n":"Brigid Parking","t":"spend","ts":0},{"id":"h5n","d":"2026-06-30","c":"Groceries","a":23.55,"n":"Coles","t":"spend","ts":0},{"id":"h5o","d":"2026-06-30","c":"Everyday","a":6.6,"n":"Coffee","t":"spend","ts":0},{"id":"h5p","d":"2026-06-30","c":"Everyday","a":5.3,"n":"Coffee","t":"spend","ts":0},{"id":"h5m","d":"2026-07-01","c":"Everyday","a":5.95,"n":"Coffee","t":"spend","ts":0},{"id":"h5h","d":"2026-07-02","c":"Money in","a":26,"n":"Dinner","t":"in","ts":0},{"id":"h5i","d":"2026-07-02","c":"Money in","a":52,"n":"Dinner","t":"in","ts":0},{"id":"h5j","d":"2026-07-02","c":"Everyday","a":157.98,"n":"Dinner","t":"spend","ts":0},{"id":"h5k","d":"2026-07-02","c":"Everyday","a":6.1,"n":"Coffee","t":"spend","ts":0},{"id":"h5l","d":"2026-07-02","c":"Everyday","a":11.95,"n":"Lunch","t":"spend","ts":0},{"id":"h5a","d":"2026-07-03","c":"Groceries","a":237.42,"n":"Coles","t":"spend","ts":0},{"id":"h5b","d":"2026-07-03","c":"Everyday","a":63.3,"n":"Dinner","t":"spend","ts":0},{"id":"h5c","d":"2026-07-03","c":"Groceries","a":43,"n":"Coles","t":"spend","ts":0},{"id":"h5d","d":"2026-07-03","c":"Parking","a":4,"n":"Parking adjustment","t":"spend","ts":0},{"id":"h5e","d":"2026-07-03","c":"Parking","a":24,"n":"Brigid Parking","t":"spend","ts":0},{"id":"h5f","d":"2026-07-03","c":"Everyday","a":6.5,"n":"Coffee","t":"spend","ts":0},{"id":"h5g","d":"2026-07-03","c":"Money in","a":26,"n":"Dinner","t":"in","ts":0},{"id":"h56","d":"2026-07-04","c":"Money in","a":65,"n":"Vape","t":"in","ts":0},{"id":"h57","d":"2026-07-04","c":"Everyday","a":57.5,"n":"Pizza","t":"spend","ts":0},{"id":"h58","d":"2026-07-04","c":"Vape","a":66.04,"n":"Vape","t":"spend","ts":0},{"id":"h59","d":"2026-07-04","c":"Everyday","a":11.76,"n":"Coffee","t":"spend","ts":0},{"id":"h4s","d":"2026-07-06","c":"From savings","a":90,"n":"","t":"fromSav","ts":0},{"id":"h4t","d":"2026-07-06","c":"Money in","a":7,"n":"Laundromat","t":"in","ts":0},{"id":"h4u","d":"2026-07-06","c":"Money in","a":24.76,"n":"Groom Boxes","t":"in","ts":0},{"id":"h4v","d":"2026-07-06","c":"Money in","a":19.59,"n":"Groom Cards","t":"in","ts":0},{"id":"h4w","d":"2026-07-06","c":"Money in","a":88.95,"n":"Golf Balls","t":"in","ts":0},{"id":"h4x","d":"2026-07-06","c":"Money in","a":14.59,"n":"Groom Cards","t":"in","ts":0},{"id":"h4y","d":"2026-07-06","c":"Money in","a":40,"n":"Groom Boxes","t":"in","ts":0},{"id":"h4z","d":"2026-07-06","c":"Money in","a":30,"n":"Allowance","t":"in","ts":0},{"id":"h50","d":"2026-07-06","c":"Other","a":40.83,"n":"Groom Boxes","t":"spend","ts":0},{"id":"h51","d":"2026-07-06","c":"Other","a":14.59,"n":"Groom Cards","t":"spend","ts":0},{"id":"h52","d":"2026-07-06","c":"Other","a":88.95,"n":"Golf Balls","t":"spend","ts":0},{"id":"h53","d":"2026-07-06","c":"Other","a":19.59,"n":"Groom Cards","t":"spend","ts":0},{"id":"h54","d":"2026-07-06","c":"Other","a":24.76,"n":"Gift Boxes","t":"spend","ts":0},{"id":"h55","d":"2026-07-06","c":"Everyday","a":7,"n":"Laundromat","t":"spend","ts":0},{"id":"h4l","d":"2026-07-07","c":"Money in","a":5,"n":"Parking","t":"in","ts":0},{"id":"h4m","d":"2026-07-07","c":"Groceries","a":3.55,"n":"Milk","t":"spend","ts":0},{"id":"h4n","d":"2026-07-07","c":"Money in","a":5,"n":"Parking","t":"in","ts":0},{"id":"h4o","d":"2026-07-07","c":"Money in","a":2.1,"n":"Drink","t":"in","ts":0},{"id":"h4p","d":"2026-07-07","c":"Everyday","a":2.1,"n":"Drink","t":"spend","ts":0},{"id":"h4q","d":"2026-07-07","c":"Everyday","a":5.5,"n":"Coffee","t":"spend","ts":0},{"id":"h4r","d":"2026-07-07","c":"Everyday","a":11.68,"n":"Coffee","t":"spend","ts":0},{"id":"h4h","d":"2026-07-08","c":"Money in","a":45.05,"n":"Medicare","t":"in","ts":0},{"id":"h4i","d":"2026-07-08","c":"Money in","a":110.7,"n":"Telehealth","t":"in","ts":0},{"id":"h4j","d":"2026-07-08","c":"Everyday","a":107.18,"n":"Telehealth","t":"spend","ts":0},{"id":"h4k","d":"2026-07-08","c":"Everyday","a":5.95,"n":"Coffee","t":"spend","ts":0},{"id":"h4e","d":"2026-07-09","c":"Everyday","a":16,"n":"Drink","t":"spend","ts":0},{"id":"h4f","d":"2026-07-09","c":"Money in","a":25,"n":"Drink","t":"in","ts":0},{"id":"h4g","d":"2026-07-09","c":"Everyday","a":44.23,"n":"Lunch","t":"spend","ts":0},{"id":"h46","d":"2026-07-10","c":"Everyday","a":18.9,"n":"Rice Fields","t":"spend","ts":0},{"id":"h47","d":"2026-07-10","c":"Everyday","a":20.15,"n":"Maccas","t":"spend","ts":0},{"id":"h48","d":"2026-07-10","c":"Groceries","a":58.05,"n":"Groceries","t":"spend","ts":0},{"id":"h49","d":"2026-07-10","c":"Everyday","a":37.37,"n":"Chemist warehouse","t":"spend","ts":0},{"id":"h4a","d":"2026-07-10","c":"Everyday","a":5.95,"n":"Coffee","t":"spend","ts":0},{"id":"h4b","d":"2026-07-10","c":"Everyday","a":5.5,"n":"Coffee","t":"spend","ts":0},{"id":"h4c","d":"2026-07-10","c":"Petrol","a":51.46,"n":"Petrol","t":"spend","ts":0},{"id":"h4d","d":"2026-07-10","c":"Everyday","a":29.2,"n":"Amazon","t":"spend","ts":0},{"id":"h3w","d":"2026-07-11","c":"Everyday","a":42.9,"n":"Dinner","t":"spend","ts":0},{"id":"h3x","d":"2026-07-11","c":"Everyday","a":25.3,"n":"Dinner","t":"spend","ts":0},{"id":"h3y","d":"2026-07-11","c":"Petrol","a":50,"n":"Petrol","t":"spend","ts":0},{"id":"h3z","d":"2026-07-11","c":"Everyday","a":14.39,"n":"Coffee","t":"spend","ts":0},{"id":"h40","d":"2026-07-11","c":"Everyday","a":4.4,"n":"Stamp","t":"spend","ts":0},{"id":"h41","d":"2026-07-11","c":"Groceries","a":222.39,"n":"Coles","t":"spend","ts":0},{"id":"h42","d":"2026-07-11","c":"Everyday","a":30,"n":"BNPL","t":"spend","ts":0},{"id":"h43","d":"2026-07-11","c":"Everyday","a":32,"n":"Lush","t":"spend","ts":0},{"id":"h44","d":"2026-07-11","c":"Everyday","a":36.29,"n":"Nails","t":"spend","ts":0},{"id":"h45","d":"2026-07-11","c":"Everyday","a":56.52,"n":"Eyebrows","t":"spend","ts":0},{"id":"h3t","d":"2026-07-13","c":"Parking","a":28,"n":"Brigid Parking","t":"spend","ts":0},{"id":"h3u","d":"2026-07-13","c":"Everyday","a":6.5,"n":"Coffee","t":"spend","ts":0},{"id":"h3v","d":"2026-07-13","c":"Everyday","a":22.48,"n":"Drinks","t":"spend","ts":0},{"id":"h3p","d":"2026-07-14","c":"Everyday","a":45,"n":"Iconic","t":"spend","ts":0},{"id":"h3q","d":"2026-07-14","c":"Everyday","a":19.98,"n":"Amazon","t":"spend","ts":0},{"id":"h3r","d":"2026-07-14","c":"Parking","a":15,"n":"Parking","t":"spend","ts":0},{"id":"h3s","d":"2026-07-14","c":"Everyday","a":5.95,"n":"Coffee","t":"spend","ts":0},{"id":"h3l","d":"2026-07-15","c":"Groceries","a":33.05,"n":"Coles","t":"spend","ts":0},{"id":"h3m","d":"2026-07-15","c":"Parking","a":5,"n":"Work","t":"spend","ts":0},{"id":"h3n","d":"2026-07-15","c":"Vape","a":50,"n":"Vape","t":"spend","ts":0},{"id":"h3o","d":"2026-07-15","c":"Everyday","a":5,"n":"Coffee","t":"spend","ts":0},{"id":"h3g","d":"2026-07-16","c":"Everyday","a":36.8,"n":"Maccas","t":"spend","ts":0},{"id":"h3h","d":"2026-07-16","c":"Everyday","a":11.49,"n":"Boxes","t":"spend","ts":0},{"id":"h3i","d":"2026-07-16","c":"Everyday","a":108,"n":"Mecca","t":"spend","ts":0},{"id":"h3j","d":"2026-07-16","c":"Other","a":260,"n":"Dryer Repair","t":"spend","ts":0},{"id":"h3k","d":"2026-07-16","c":"Other Subs","a":2.29,"n":"App Store","t":"spend","ts":0},{"id":"h3e","d":"2026-07-17","c":"Everyday","a":60,"n":"Golf","t":"spend","ts":0},{"id":"h3f","d":"2026-07-17","c":"Everyday","a":5.95,"n":"Coffee","t":"spend","ts":0},{"id":"h32","d":"2026-07-18","c":"Groceries","a":239.77,"n":"Coles","t":"spend","ts":0},{"id":"h33","d":"2026-07-18","c":"Everyday","a":20.33,"n":"Driving Range","t":"spend","ts":0},{"id":"h34","d":"2026-07-18","c":"Everyday","a":50.35,"n":"Golf Balls","t":"spend","ts":0},{"id":"h35","d":"2026-07-18","c":"Everyday","a":6.2,"n":"Car Wash","t":"spend","ts":0},{"id":"h36","d":"2026-07-18","c":"Everyday","a":3.2,"n":"Car Wash","t":"spend","ts":0},{"id":"h37","d":"2026-07-18","c":"Everyday","a":70.21,"n":"Pizza","t":"spend","ts":0},{"id":"h38","d":"2026-07-18","c":"Everyday","a":9.47,"n":"Sushi","t":"spend","ts":0},{"id":"h39","d":"2026-07-18","c":"Everyday","a":68.95,"n":"Protein","t":"spend","ts":0},{"id":"h3a","d":"2026-07-18","c":"Everyday","a":65,"n":"Charlie Bday","t":"spend","ts":0},{"id":"h3b","d":"2026-07-18","c":"Everyday","a":105.91,"n":"Sportsgirl","t":"spend","ts":0},{"id":"h3c","d":"2026-07-18","c":"Everyday","a":11.9,"n":"Coffee","t":"spend","ts":0},{"id":"h3d","d":"2026-07-18","c":"Groceries","a":55.05,"n":"Coles","t":"spend","ts":0},{"id":"h2x","d":"2026-07-19","c":"Money in","a":46,"n":"Kayo","t":"in","ts":0},{"id":"h2y","d":"2026-07-19","c":"From savings","a":350,"n":"","t":"fromSav","ts":0},{"id":"h2z","d":"2026-07-19","c":"Money in","a":70,"n":"Transfer pizza","t":"in","ts":0},{"id":"h30","d":"2026-07-19","c":"Everyday","a":12.41,"n":"Coffee","t":"spend","ts":0},{"id":"h31","d":"2026-07-19","c":"Everyday","a":7,"n":"Maccas","t":"spend","ts":0},{"id":"h2r","d":"2026-07-20","c":"From savings","a":1,"n":"","t":"fromSav","ts":0},{"id":"h2s","d":"2026-07-20","c":"From savings","a":34,"n":"","t":"fromSav","ts":0},{"id":"h2t","d":"2026-07-20","c":"From savings","a":108,"n":"","t":"fromSav","ts":0},{"id":"h2u","d":"2026-07-20","c":"Everyday","a":6.5,"n":"Coffee","t":"spend","ts":0},{"id":"h2v","d":"2026-07-20","c":"From savings","a":50,"n":"","t":"fromSav","ts":0},{"id":"h2w","d":"2026-07-20","c":"Everyday","a":12.29,"n":"Sammi Card","t":"spend","ts":0},{"id":"h2o","d":"2026-07-21","c":"Everyday","a":13.68,"n":"Coffee","t":"spend","ts":0},{"id":"h2p","d":"2026-07-21","c":"Everyday","a":5.95,"n":"Coffee","t":"spend","ts":0},{"id":"h2q","d":"2026-07-21","c":"From savings","a":205.35,"n":"","t":"fromSav","ts":0},{"id":"h2a","d":"2026-07-22","c":"Money in","a":351,"n":"Rego","t":"in","ts":0},{"id":"h2b","d":"2026-07-22","c":"Money in","a":20,"n":"Laundromat","t":"in","ts":0},{"id":"h2c","d":"2026-07-22","c":"Money in","a":16,"n":"Laundromat","t":"in","ts":0},{"id":"h2d","d":"2026-07-22","c":"Money in","a":45,"n":"Medicare","t":"in","ts":0},{"id":"h2e","d":"2026-07-22","c":"Everyday","a":14,"n":"Laundromat","t":"spend","ts":0},{"id":"h2f","d":"2026-07-22","c":"Everyday","a":14,"n":"Laundromat","t":"spend","ts":0},{"id":"h2g","d":"2026-07-22","c":"Everyday","a":12,"n":"Laundromat","t":"spend","ts":0},{"id":"h2h","d":"2026-07-22","c":"Everyday","a":9,"n":"Laundromat","t":"spend","ts":0},{"id":"h2i","d":"2026-07-22","c":"Groceries","a":39.8,"n":"Coles","t":"spend","ts":0},{"id":"h2j","d":"2026-07-22","c":"Everyday","a":3.4,"n":"Bread","t":"spend","ts":0},{"id":"h2k","d":"2026-07-22","c":"Groceries","a":23.25,"n":"Woolies","t":"spend","ts":0},{"id":"h2l","d":"2026-07-22","c":"Everyday","a":14.39,"n":"Coffee","t":"spend","ts":0},{"id":"h2m","d":"2026-07-22","c":"Everyday","a":107.18,"n":"Doctors","t":"spend","ts":0},{"id":"h2n","d":"2026-07-22","c":"Everyday","a":5.95,"n":"Coffee","t":"spend","ts":0},{"id":"h27","d":"2026-07-23","c":"Everyday","a":13.9,"n":"Juice","t":"spend","ts":0},{"id":"h28","d":"2026-07-23","c":"Everyday","a":21.9,"n":"Sandwich","t":"spend","ts":0},{"id":"h29","d":"2026-07-23","c":"Everyday","a":5.95,"n":"Coffee","t":"spend","ts":0},{"id":"h1u","d":"2026-07-24","c":"Everyday","a":32,"n":"Bnpl","t":"spend","ts":0},{"id":"h1v","d":"2026-07-24","c":"Everyday","a":42.05,"n":"Maccas","t":"spend","ts":0},{"id":"h1w","d":"2026-07-24","c":"Everyday","a":22.99,"n":"Book","t":"spend","ts":0},{"id":"h1x","d":"2026-07-24","c":"Everyday","a":28.15,"n":"Kmart","t":"spend","ts":0},{"id":"h1y","d":"2026-07-24","c":"Everyday","a":11.95,"n":"Snack","t":"spend","ts":0},{"id":"h1z","d":"2026-07-24","c":"Everyday","a":12.4,"n":"Lunch","t":"spend","ts":0},{"id":"h20","d":"2026-07-24","c":"Everyday","a":11.38,"n":"Lunch","t":"spend","ts":0},{"id":"h21","d":"2026-07-24","c":"Money in","a":75.97,"n":"Bnpl","t":"in","ts":0},{"id":"h22","d":"2026-07-24","c":"Money in","a":62,"n":"Pizza","t":"in","ts":0},{"id":"h23","d":"2026-07-24","c":"Everyday","a":62,"n":"Pizza","t":"spend","ts":0},{"id":"h24","d":"2026-07-24","c":"Vape","a":50,"n":"Vape","t":"spend","ts":0},{"id":"h25","d":"2026-07-24","c":"Everyday","a":6.2,"n":"Coffee","t":"spend","ts":0},{"id":"h26","d":"2026-07-24","c":"Everyday","a":5.95,"n":"Coffee","t":"spend","ts":0},{"id":"h1k","d":"2026-07-25","c":"Everyday","a":25.39,"n":"Yochi","t":"spend","ts":0},{"id":"h1l","d":"2026-07-25","c":"Parking","a":19,"n":"Parking","t":"spend","ts":0},{"id":"h1m","d":"2026-07-25","c":"Everyday","a":54.9,"n":"Meeq","t":"spend","ts":0},{"id":"h1n","d":"2026-07-25","c":"Everyday","a":100.1,"n":"Uniqlo","t":"spend","ts":0},{"id":"h1o","d":"2026-07-25","c":"Everyday","a":25.92,"n":"Pasta Shop","t":"spend","ts":0},{"id":"h1p","d":"2026-07-25","c":"Everyday","a":24.16,"n":"Dad mustard","t":"spend","ts":0},{"id":"h1q","d":"2026-07-25","c":"Everyday","a":32.41,"n":"Dance Bakes","t":"spend","ts":0},{"id":"h1r","d":"2026-07-25","c":"Parking","a":6.12,"n":"Parking","t":"spend","ts":0},{"id":"h1s","d":"2026-07-25","c":"Groceries","a":233.03,"n":"Coles","t":"spend","ts":0},{"id":"h1t","d":"2026-07-25","c":"Everyday","a":122.61,"n":"Parking Fine Yarra Council","t":"spend","ts":0},{"id":"h1f","d":"2026-07-26","c":"Everyday","a":72,"n":"Sammi flowers","t":"spend","ts":0},{"id":"h1g","d":"2026-07-26","c":"Everyday","a":17.99,"n":"Swimming cap","t":"spend","ts":0},{"id":"h1h","d":"2026-07-26","c":"Everyday","a":14.78,"n":"Coffee","t":"spend","ts":0},{"id":"h1i","d":"2026-07-26","c":"Everyday","a":81.44,"n":"Haircut","t":"spend","ts":0},{"id":"h1j","d":"2026-07-26","c":"Petrol","a":56.36,"n":"Fuel","t":"spend","ts":0},{"id":"h1e","d":"2026-07-27","c":"Everyday","a":6.5,"n":"Coffee","t":"spend","ts":0},{"id":"h1b","d":"2026-07-28","c":"Other Subs","a":29.99,"n":"ChatGPT","t":"spend","ts":0},{"id":"h1c","d":"2026-07-28","c":"Groceries","a":13.5,"n":"Panadol","t":"spend","ts":0},{"id":"h1d","d":"2026-07-28","c":"Everyday","a":6.6,"n":"Coffee","t":"spend","ts":0},{"id":"h19","d":"2026-07-29","c":"Everyday","a":1,"n":"Post Office","t":"spend","ts":0},{"id":"h1a","d":"2026-07-29","c":"Everyday","a":5.5,"n":"Coffee","t":"spend","ts":0},{"id":"h10","d":"2026-07-31","c":"Money in","a":850,"n":"Tyre Replacement","t":"in","ts":0},{"id":"h11","d":"2026-07-31","c":"Other","a":864.8,"n":"New Tyre","t":"spend","ts":0},{"id":"h12","d":"2026-07-31","c":"Money in","a":65,"n":"Cecilia Vape","t":"in","ts":0},{"id":"h13","d":"2026-07-31","c":"Everyday","a":2.2,"n":"Drink","t":"spend","ts":0},{"id":"h14","d":"2026-07-31","c":"Everyday","a":4.9,"n":"Lunch","t":"spend","ts":0},{"id":"h15","d":"2026-07-31","c":"Everyday","a":20.5,"n":"Lunch","t":"spend","ts":0},{"id":"h16","d":"2026-07-31","c":"Everyday","a":8.5,"n":"Lunch","t":"spend","ts":0},{"id":"h17","d":"2026-07-31","c":"Everyday","a":5.95,"n":"Coffee","t":"spend","ts":0},{"id":"h18","d":"2026-07-31","c":"Everyday","a":6.2,"n":"Coffee","t":"spend","ts":0},{"id":"h0","d":"2026-08-02","c":"From savings","a":150,"n":"","t":"fromSav","ts":0},{"id":"h1","d":"2026-08-02","c":"From savings","a":200,"n":"","t":"fromSav","ts":0},{"id":"h2","d":"2026-08-02","c":"From savings","a":56.18,"n":"","t":"fromSav","ts":0},{"id":"h3","d":"2026-08-02","c":"From savings","a":150,"n":"","t":"fromSav","ts":0},{"id":"h4","d":"2026-08-02","c":"From savings","a":20,"n":"","t":"fromSav","ts":0},{"id":"h5","d":"2026-08-02","c":"From savings","a":150,"n":"","t":"fromSav","ts":0},{"id":"h6","d":"2026-08-02","c":"From savings","a":150,"n":"","t":"fromSav","ts":0},{"id":"h7","d":"2026-08-02","c":"From savings","a":65,"n":"","t":"fromSav","ts":0},{"id":"h8","d":"2026-08-02","c":"Everyday","a":62.8,"n":"Rice Fields","t":"spend","ts":0},{"id":"h9","d":"2026-08-02","c":"Petrol","a":55.99,"n":"Fuel","t":"spend","ts":0},{"id":"ha","d":"2026-08-02","c":"Everyday","a":3.2,"n":"Car Wash","t":"spend","ts":0},{"id":"hb","d":"2026-08-02","c":"Everyday","a":5.95,"n":"KFC","t":"spend","ts":0},{"id":"hc","d":"2026-08-02","c":"Everyday","a":8.14,"n":"Coffee","t":"spend","ts":0},{"id":"hd","d":"2026-08-02","c":"Everyday","a":23.44,"n":"Coffee","t":"spend","ts":0},{"id":"he","d":"2026-08-02","c":"Everyday","a":41.28,"n":"Bridie Chemist","t":"spend","ts":0},{"id":"hf","d":"2026-08-02","c":"Everyday","a":57.18,"n":"Amazon","t":"spend","ts":0},{"id":"hg","d":"2026-08-02","c":"Everyday","a":6.8,"n":"Drink","t":"spend","ts":0},{"id":"hh","d":"2026-08-02","c":"Petrol","a":60,"n":"Fuel","t":"spend","ts":0},{"id":"hi","d":"2026-08-02","c":"Everyday","a":20,"n":"Madeleine bday","t":"spend","ts":0},{"id":"hj","d":"2026-08-02","c":"Groceries","a":35.25,"n":"Coles","t":"spend","ts":0},{"id":"hk","d":"2026-08-02","c":"Everyday","a":20,"n":"Sportsbet","t":"spend","ts":0},{"id":"hl","d":"2026-08-02","c":"Groceries","a":123.74,"n":"Petbarn","t":"spend","ts":0},{"id":"hm","d":"2026-08-02","c":"Everyday","a":53.77,"n":"Brunch","t":"spend","ts":0},{"id":"hn","d":"2026-08-02","c":"Groceries","a":199.21,"n":"Coles","t":"spend","ts":0},{"id":"ho","d":"2026-08-02","c":"Petrol","a":73.57,"n":"Petrol","t":"spend","ts":0},{"id":"hp","d":"2026-08-02","c":"Everyday","a":38.12,"n":"Pizza","t":"spend","ts":0},{"id":"hq","d":"2026-08-02","c":"Groceries","a":17.35,"n":"Coles","t":"spend","ts":0},{"id":"hr","d":"2026-08-02","c":"Everyday","a":9,"n":"Bridesmaid box","t":"spend","ts":0},{"id":"hs","d":"2026-08-02","c":"Everyday","a":54,"n":"Mecca","t":"spend","ts":0},{"id":"ht","d":"2026-08-02","c":"Everyday","a":12.5,"n":"Kmart","t":"spend","ts":0},{"id":"hu","d":"2026-08-02","c":"Everyday","a":23.29,"n":"Book","t":"spend","ts":0},{"id":"hv","d":"2026-08-02","c":"Everyday","a":40.66,"n":"Nails","t":"spend","ts":0},{"id":"hw","d":"2026-08-02","c":"Everyday","a":56.52,"n":"Eyebrows","t":"spend","ts":0},{"id":"hx","d":"2026-08-02","c":"Everyday","a":13.15,"n":"Maccas","t":"spend","ts":0},{"id":"hy","d":"2026-08-02","c":"Everyday","a":13.05,"n":"Coffee","t":"spend","ts":0},{"id":"hz","d":"2026-08-02","c":"Everyday","a":66.07,"n":"Cecilia Vape","t":"spend","ts":0},{"id":"hst","d":"2026-08-02","c":"Money in","a":270,"n":"Tolls","t":"in","ts":0},{"id":"hsu","d":"2026-08-03","c":"Everyday","a":6.2,"n":"Coffee","t":"spend","ts":0},{"id":"hsv","d":"2026-08-03","c":"From savings","a":50,"n":"","t":"fromSav","ts":0},{"id":"hsw","d":"2026-08-04","c":"Everyday","a":5.95,"n":"Coffee","t":"spend","ts":0},{"id":"hsx","d":"2026-08-05","c":"Money in","a":120,"n":"Insurance","t":"in","ts":0},{"id":"hsy","d":"2026-08-05","c":"Everyday","a":6.2,"n":"Coffee","t":"spend","ts":0},{"id":"hsz","d":"2026-08-05","c":"Everyday","a":7.5,"n":"Coffee","t":"spend","ts":0},{"id":"ht0","d":"2026-08-05","c":"Gift","a":102,"n":"Madeleine Present","t":"spend","ts":0},{"id":"ht1","d":"2026-08-05","c":"Groceries","a":49.8,"n":"Coles","t":"spend","ts":0},{"id":"ht2","d":"2026-08-05","c":"Other","a":35.89,"n":"Drinks","t":"spend","ts":0},{"id":"ht3","d":"2026-08-05","c":"Other","a":11.12,"n":"Drinks","t":"spend","ts":0},{"id":"ht4","d":"2026-08-05","c":"Parking","a":10.1,"n":"Parking","t":"spend","ts":0},{"id":"ht5","d":"2026-08-05","c":"From savings","a":100,"n":"","t":"fromSav","ts":0},{"id":"ht6","d":"2026-08-05","c":"From savings","a":102.1,"n":"","t":"fromSav","ts":0},{"id":"ht7","d":"2026-08-05","c":"From savings","a":-5,"n":"","t":"fromSav","ts":0},{"id":"ht8","d":"2026-08-06","c":"Everyday","a":8.64,"n":"Coffee","t":"spend","ts":0},{"id":"ht9","d":"2026-08-06","c":"Everyday","a":7.33,"n":"Coffee","t":"spend","ts":0},{"id":"hta","d":"2026-08-06","c":"Everyday","a":2.2,"n":"Drink","t":"spend","ts":0},{"id":"htb","d":"2026-08-06","c":"Money in","a":50,"n":"Gym","t":"in","ts":0},{"id":"htc","d":"2026-08-06","c":"From savings","a":75.97,"n":"","t":"fromSav","ts":0},{"id":"htd","d":"2026-08-07","c":"Parking","a":8,"n":"Parking","t":"spend","ts":0},{"id":"hte","d":"2026-08-07","c":"Everyday","a":21.32,"n":"Drinks","t":"spend","ts":0},{"id":"htf","d":"2026-08-07","c":"Everyday","a":41.6,"n":"Maccas","t":"spend","ts":0},{"id":"htg","d":"2026-08-07","c":"Groceries","a":20.45,"n":"Coles","t":"spend","ts":0},{"id":"hth","d":"2026-08-07","c":"Parking","a":28,"n":"Parking","t":"spend","ts":0},{"id":"hti","d":"2026-08-07","c":"Everyday","a":46.08,"n":"Books","t":"spend","ts":0},{"id":"htj","d":"2026-08-08","c":"Everyday","a":140,"n":"Palermo Perfume","t":"spend","ts":0},{"id":"htk","d":"2026-08-09","c":"Everyday","a":55,"n":"Myer","t":"spend","ts":0},{"id":"htl","d":"2026-08-09","c":"Everyday","a":32.77,"n":"Coffee","t":"spend","ts":0},{"id":"htm","d":"2026-08-09","c":"Everyday","a":53.85,"n":"Dragon Hot Pot","t":"spend","ts":0},{"id":"htn","d":"2026-08-09","c":"Everyday","a":32.37,"n":"Yochi","t":"spend","ts":0},{"id":"hto","d":"2026-08-09","c":"Groceries","a":194,"n":"Coles","t":"spend","ts":0},{"id":"htp","d":"2026-08-09","c":"Everyday","a":12.92,"n":"Coffee","t":"spend","ts":0},{"id":"htq","d":"2026-08-09","c":"Groceries","a":9.93,"n":"Woolies","t":"spend","ts":0},{"id":"htr","d":"2026-08-09","c":"Everyday","a":27.97,"n":"Chemist Warehouse","t":"spend","ts":0},{"id":"hts","d":"2026-08-09","c":"Everyday","a":20.2,"n":"Subway","t":"spend","ts":0},{"id":"htt","d":"2026-08-09","c":"Everyday","a":43.95,"n":"Petbarn","t":"spend","ts":0},{"id":"htu","d":"2026-08-09","c":"Everyday","a":20,"n":"Sportsbet","t":"spend","ts":0},{"id":"htv","d":"2026-08-11","c":"Groceries","a":12.4,"n":"Coles","t":"spend","ts":0},{"id":"htw","d":"2026-08-11","c":"Groceries","a":11,"n":"Coles","t":"spend","ts":0},{"id":"htx","d":"2026-08-11","c":"Everyday","a":6.5,"n":"Coffee","t":"spend","ts":0},{"id":"hty","d":"2026-08-11","c":"Everyday","a":35,"n":"Mecca","t":"spend","ts":0},{"id":"htz","d":"2026-08-12","c":"Everyday","a":6.2,"n":"Coffee","t":"spend","ts":0},{"id":"hu0","d":"2026-08-12","c":"Everyday","a":4.5,"n":"Coffee","t":"spend","ts":0},{"id":"hu1","d":"2026-08-12","c":"Money in","a":158,"n":"Alcohol","t":"in","ts":0},{"id":"hu2","d":"2026-08-12","c":"Everyday","a":147.96,"n":"Dan Murphys","t":"spend","ts":0},{"id":"hu7","d":"2026-08-13","c":"From savings","a":118,"n":"","t":"fromSav","ts":0},{"id":"hu3","d":"2026-08-14","c":"Everyday","a":5.95,"n":"Coffee","t":"spend","ts":0},{"id":"hu4","d":"2026-08-14","c":"Everyday","a":16.75,"n":"Lunch","t":"spend","ts":0},{"id":"hu5","d":"2026-08-14","c":"Petrol","a":60,"n":"Fuel","t":"spend","ts":0},{"id":"hu6","d":"2026-08-14","c":"Groceries","a":76.3,"n":"Coles","t":"spend","ts":0},{"id":"hu8","d":"2026-08-14","c":"From savings","a":242,"n":"","t":"fromSav","ts":0},{"id":"hu9","d":"2026-08-14","c":"From savings","a":30,"n":"","t":"fromSav","ts":0},{"id":"hua","d":"2026-08-14","c":"Everyday","a":20.15,"n":"Maccas","t":"spend","ts":0},{"id":"huc","d":"2026-08-15","c":"Everyday","a":117.43,"n":"Chemist Warehouse","t":"spend","ts":0},{"id":"hud","d":"2026-08-15","c":"Everyday","a":33.38,"n":"Coffee","t":"spend","ts":0},{"id":"hue","d":"2026-08-15","c":"Parking","a":10,"n":"Parking","t":"spend","ts":0},{"id":"huf","d":"2026-08-15","c":"Parking","a":4.7,"n":"Parking","t":"spend","ts":0},{"id":"hug","d":"2026-08-15","c":"Other","a":389.57,"n":"Ronnies","t":"spend","ts":0},{"id":"huh","d":"2026-08-16","c":"Groceries","a":82.12,"n":"Coles","t":"spend","ts":0},{"id":"hui","d":"2026-08-16","c":"Everyday","a":12.92,"n":"Coffee","t":"spend","ts":0},{"id":"huj","d":"2026-08-16","c":"Everyday","a":31.58,"n":"Yochi","t":"spend","ts":0},{"id":"huk","d":"2026-08-17","c":"Petrol","a":60.01,"n":"Fuel","t":"spend","ts":0},{"id":"hul","d":"2026-08-17","c":"Everyday","a":6.2,"n":"Coffee","t":"spend","ts":0},{"id":"hum","d":"2026-08-17","c":"Groceries","a":24.5,"n":"Coles","t":"spend","ts":0},{"id":"huo","d":"2026-08-17","c":"Other","a":0.92,"n":"Transaction fee","t":"spend","ts":0},{"id":"hun","d":"2026-08-18","c":"Everyday","a":29.98,"n":"Amazon","t":"spend","ts":0},{"id":"hup","d":"2026-08-18","c":"Everyday","a":6.5,"n":"Coffee","t":"spend","ts":0},{"id":"huq","d":"2026-08-18","c":"Everyday","a":5.95,"n":"Coffee","t":"spend","ts":0},{"id":"hur","d":"2026-08-18","c":"Everyday","a":16,"n":"Drink","t":"spend","ts":0},{"id":"hus","d":"2026-08-18","c":"Groceries","a":10.45,"n":"Coles","t":"spend","ts":0},{"id":"hut","d":"2026-08-19","c":"Money in","a":45.99,"n":"Kayo","t":"in","ts":0},{"id":"huu","d":"2026-08-19","c":"Money in","a":33,"n":"Parking","t":"in","ts":0},{"id":"huv","d":"2026-08-19","c":"Everyday","a":6.2,"n":"Coffee","t":"spend","ts":0},{"id":"huw","d":"2026-08-19","c":"Everyday","a":5.5,"n":"Coffee","t":"spend","ts":0},{"id":"hux","d":"2026-08-19","c":"From savings","a":300,"n":"","t":"fromSav","ts":0},{"id":"huy","d":"2026-08-19","c":"Groceries","a":15.85,"n":"Coles","t":"spend","ts":0},{"id":"huz","d":"2026-08-19","c":"Everyday","a":76,"n":"Bnpl","t":"spend","ts":0},{"id":"hv0","d":"2026-08-19","c":"Everyday","a":20,"n":"Gift","t":"spend","ts":0},{"id":"hv1","d":"2026-08-19","c":"Petrol","a":60,"n":"Fuel","t":"spend","ts":0},{"id":"hv2","d":"2026-08-20","c":"Everyday","a":14,"n":"Amazon","t":"spend","ts":0},{"id":"hv3","d":"2026-08-20","c":"Everyday","a":0.99,"n":"Amazon","t":"spend","ts":0},{"id":"hv4","d":"2026-08-20","c":"Everyday","a":5.95,"n":"Coffee","t":"spend","ts":0},{"id":"hv5","d":"2026-08-20","c":"Everyday","a":12.41,"n":"Coffee","t":"spend","ts":0},{"id":"hv6","d":"2026-08-20","c":"Everyday","a":8.5,"n":"Lunch","t":"spend","ts":0},{"id":"hv7","d":"2026-08-20","c":"Money in","a":60,"n":"Dinner","t":"in","ts":0},{"id":"hv8","d":"2026-08-20","c":"Everyday","a":62.8,"n":"Dinner","t":"spend","ts":0},{"id":"hv9","d":"2026-08-20","c":"Everyday","a":2.5,"n":"Maccas","t":"spend","ts":0},{"id":"hva","d":"2026-08-20","c":"From savings","a":40,"n":"","t":"fromSav","ts":0},{"id":"hvb","d":"2026-08-21","c":"Everyday","a":4.9,"n":"Lunch","t":"spend","ts":0},{"id":"hvc","d":"2026-08-21","c":"Everyday","a":6.2,"n":"Coffee","t":"spend","ts":0},{"id":"hvd","d":"2026-08-21","c":"Parking","a":28,"n":"Parking","t":"spend","ts":0},{"id":"hve","d":"2026-08-21","c":"Everyday","a":63.68,"n":"Dinner","t":"spend","ts":0},{"id":"hvf","d":"2026-08-21","c":"Everyday","a":21.15,"n":"Maccas","t":"spend","ts":0},{"id":"hvg","d":"2026-08-22","c":"Money in","a":276.4,"n":"Tolls","t":"in","ts":0},{"id":"hvh","d":"2026-08-22","c":"Everyday","a":22.38,"n":"Bunnings","t":"spend","ts":0},{"id":"hvi","d":"2026-08-22","c":"Everyday","a":123,"n":"Petbarn","t":"spend","ts":0},{"id":"hvj","d":"2026-08-22","c":"Everyday","a":28.63,"n":"Coffee","t":"spend","ts":0},{"id":"hvk","d":"2026-08-22","c":"Everyday","a":40.66,"n":"Nails","t":"spend","ts":0},{"id":"hvl","d":"2026-08-22","c":"Everyday","a":4.7,"n":"Food","t":"spend","ts":0},{"id":"hvm","d":"2026-08-22","c":"Groceries","a":204.36,"n":"Coles","t":"spend","ts":0},{"id":"hvn","d":"2026-08-22","c":"Everyday","a":28.78,"n":"Yochi","t":"spend","ts":0},{"id":"hvo","d":"2026-08-23","c":"Everyday","a":21.09,"n":"Coffee","t":"spend","ts":0},{"id":"hvp","d":"2026-08-23","c":"Everyday","a":39.1,"n":"Maccas","t":"spend","ts":0},{"id":"hvq","d":"2026-08-23","c":"Everyday","a":36.99,"n":"Amazon","t":"spend","ts":0},{"id":"hvr","d":"2026-08-24","c":"Parking","a":28,"n":"Parking","t":"spend","ts":0},{"id":"hvw","d":"2026-08-24","c":"Everyday","a":12,"n":"Coffee","t":"spend","ts":0},{"id":"hvs","d":"2026-08-25","c":"Parking","a":5,"n":"Parking","t":"spend","ts":0},{"id":"hvx","d":"2026-08-25","c":"Everyday","a":6.2,"n":"Coffee","t":"spend","ts":0},{"id":"hvy","d":"2026-08-25","c":"Everyday","a":6.6,"n":"Coffee","t":"spend","ts":0},{"id":"hvz","d":"2026-08-25","c":"Other Subs","a":2.99,"n":"App Store","t":"spend","ts":0},{"id":"hvt","d":"2026-08-26","c":"Parking","a":28,"n":"Parking","t":"spend","ts":0},{"id":"hvu","d":"2026-08-27","c":"Parking","a":5,"n":"Parking","t":"spend","ts":0},{"id":"hw0","d":"2026-08-27","c":"Everyday","a":1.2,"n":"Coffee","t":"spend","ts":0},{"id":"hw1","d":"2026-08-27","c":"Everyday","a":6.2,"n":"Coffee","t":"spend","ts":0},{"id":"hw2","d":"2026-08-27","c":"Groceries","a":47.45,"n":"Coles","t":"spend","ts":0},{"id":"hw3","d":"2026-08-27","c":"Other","a":758.25,"n":"Footy tickets x7","t":"spend","ts":0},{"id":"hw4","d":"2026-08-27","c":"Money in","a":214,"n":"Footy tickets x2","t":"in","ts":0},{"id":"hw5","d":"2026-08-27","c":"Money in","a":214,"n":"Footy tickets x2","t":"in","ts":0},{"id":"hw6","d":"2026-08-27","c":"Other Subs","a":40.48,"n":"ChatGPT","t":"spend","ts":0},{"id":"hw7","d":"2026-08-27","c":"Everyday","a":5.95,"n":"Coffee","t":"spend","ts":0},{"id":"hw8","d":"2026-08-27","c":"Everyday","a":6.31,"n":"Coffee","t":"spend","ts":0},{"id":"hw9","d":"2026-08-27","c":"Everyday","a":23.49,"n":"Lunch","t":"spend","ts":0},{"id":"hwa","d":"2026-08-27","c":"Everyday","a":108.3,"n":"Darling shoes","t":"spend","ts":0},{"id":"hwb","d":"2026-08-27","c":"Money in","a":572,"n":"Tickets","t":"in","ts":0},{"id":"hvv","d":"2026-08-28","c":"Parking","a":28,"n":"Parking","t":"spend","ts":0},{"id":"hwc","d":"2026-08-29","c":"Money in","a":490,"n":"Cash deposit","t":"in","ts":0},{"id":"hwd","d":"2026-08-31","c":"Everyday","a":5.85,"n":"Coffee","t":"spend","ts":0},{"id":"hwe","d":"2026-08-31","c":"Everyday","a":7.11,"n":"Coffee","t":"spend","ts":0},{"id":"hwf","d":"2026-08-31","c":"Other","a":758.25,"n":"Footy tickets","t":"spend","ts":0},{"id":"hwg","d":"2026-08-31","c":"Money in","a":1000,"n":"Footy tickets transfer","t":"in","ts":0},{"id":"hub","d":"2026-09-01","c":"Other","a":122,"n":"Parking Fine","t":"spend","ts":0},{"id":"hwh","d":"2026-09-01","c":"Everyday","a":6.2,"n":"Coffee","t":"spend","ts":0},{"id":"hwi","d":"2026-09-01","c":"Everyday","a":5.95,"n":"Coffee","t":"spend","ts":0},{"id":"hwj","d":"2026-09-01","c":"Groceries","a":25.05,"n":"Coles","t":"spend","ts":0},{"id":"hwk","d":"2026-09-02","c":"Everyday","a":5.95,"n":"Coffee","t":"spend","ts":0},{"id":"hwl","d":"2026-09-02","c":"Everyday","a":6,"n":"Laundromat","t":"spend","ts":0},{"id":"hwm","d":"2026-09-02","c":"Everyday","a":6.2,"n":"Coffee","t":"spend","ts":0},{"id":"hwn","d":"2026-09-04","c":"Everyday","a":1,"n":"Bnpl","t":"spend","ts":0},{"id":"hwo","d":"2026-09-04","c":"Everyday","a":6.39,"n":"Coffee","t":"spend","ts":0},{"id":"hwp","d":"2026-09-04","c":"Everyday","a":12.41,"n":"Coffee","t":"spend","ts":0},{"id":"hwq","d":"2026-09-04","c":"Everyday","a":8.5,"n":"Lunch","t":"spend","ts":0},{"id":"hwr","d":"2026-09-04","c":"Everyday","a":16.5,"n":"Maccas","t":"spend","ts":0},{"id":"hws","d":"2026-09-04","c":"Everyday","a":24.22,"n":"Eyebrows","t":"spend","ts":0},{"id":"hwt","d":"2026-09-04","c":"Everyday","a":22.99,"n":"Book","t":"spend","ts":0},{"id":"hwu","d":"2026-09-04","c":"Everyday","a":7.65,"n":"Maccas","t":"spend","ts":0},{"id":"hwv","d":"2026-09-04","c":"Everyday","a":6.2,"n":"Coffee","t":"spend","ts":0},{"id":"hww","d":"2026-09-04","c":"Everyday","a":75,"n":"Father’s Day","t":"spend","ts":0},{"id":"hwx","d":"2026-09-04","c":"Everyday","a":6.61,"n":"Coffee","t":"spend","ts":0},{"id":"hwy","d":"2026-09-04","c":"Everyday","a":16.98,"n":"Chemist Warehouse","t":"spend","ts":0},{"id":"hwz","d":"2026-09-04","c":"Everyday","a":6,"n":"Coffee","t":"spend","ts":0},{"id":"hx0","d":"2026-09-04","c":"Everyday","a":21.45,"n":"Maccas","t":"spend","ts":0},{"id":"hx1","d":"2026-09-04","c":"Groceries","a":152.9,"n":"Coles","t":"spend","ts":0},{"id":"hx2","d":"2026-09-04","c":"Everyday","a":6.8,"n":"Drink","t":"spend","ts":0},{"id":"hx3","d":"2026-09-04","c":"Everyday","a":18,"n":"Maccas","t":"spend","ts":0},{"id":"hx4","d":"2026-09-04","c":"Everyday","a":90,"n":"Golf","t":"spend","ts":0},{"id":"hx5","d":"2026-09-05","c":"Groceries","a":56.47,"n":"Coles","t":"spend","ts":0},{"id":"hx6","d":"2026-09-05","c":"Everyday","a":12.92,"n":"Coffee","t":"spend","ts":0},{"id":"hx7","d":"2026-09-05","c":"Everyday","a":10,"n":"Laundromat","t":"spend","ts":0},{"id":"hx8","d":"2026-09-05","c":"Everyday","a":32.43,"n":"Lunch","t":"spend","ts":0},{"id":"hx9","d":"2026-09-05","c":"Everyday","a":5.15,"n":"Maccas","t":"spend","ts":0},{"id":"hxd","d":"2026-09-06","c":"Everyday","a":7.09,"n":"Farmers Market","t":"spend","ts":0},{"id":"hxe","d":"2026-09-06","c":"Everyday","a":15.21,"n":"Farmers Market","t":"spend","ts":0},{"id":"hxf","d":"2026-09-06","c":"Everyday","a":18.85,"n":"Farmers Market","t":"spend","ts":0},{"id":"hxg","d":"2026-09-06","c":"Everyday","a":9.17,"n":"Farmers Market","t":"spend","ts":0},{"id":"hxh","d":"2026-09-06","c":"Everyday","a":25.48,"n":"Chemist Warehouse","t":"spend","ts":0},{"id":"hxi","d":"2026-09-06","c":"Everyday","a":13.41,"n":"Coffee","t":"spend","ts":0},{"id":"hxj","d":"2026-09-06","c":"Everyday","a":5.45,"n":"Card Gift","t":"spend","ts":0},{"id":"hxk","d":"2026-09-06","c":"Other","a":350.65,"n":"Fathers Day Dinner","t":"spend","ts":0},{"id":"hxl","d":"2026-09-06","c":"Parking","a":15.3,"n":"Parking","t":"spend","ts":0},{"id":"hxm","d":"2026-09-06","c":"Petrol","a":50,"n":"Fuel","t":"spend","ts":0},{"id":"hxn","d":"2026-09-07","c":"Everyday","a":5.95,"n":"Coffee","t":"spend","ts":0},{"id":"hxo","d":"2026-09-07","c":"Everyday","a":7,"n":"Coffee","t":"spend","ts":0},{"id":"hxp","d":"2026-09-07","c":"Everyday","a":10,"n":"Laundromat","t":"spend","ts":0},{"id":"hxq","d":"2026-09-07","c":"Petrol","a":60,"n":"Fuel","t":"spend","ts":0},{"id":"hxr","d":"2026-09-07","c":"Money in","a":75,"n":"Dinner Transfer","t":"in","ts":0},{"id":"hxs","d":"2026-09-07","c":"Money in","a":120,"n":"Car Insurance","t":"in","ts":0},{"id":"hxu","d":"2026-09-08","c":"Everyday","a":6.2,"n":"Coffee","t":"spend","ts":0},{"id":"hxv","d":"2026-09-08","c":"Everyday","a":5.95,"n":"Coffee","t":"spend","ts":0},{"id":"hxw","d":"2026-09-08","c":"Everyday","a":5,"n":"Snack","t":"spend","ts":0},{"id":"hxx","d":"2026-09-08","c":"Groceries","a":38.15,"n":"Coles","t":"spend","ts":0},{"id":"hxy","d":"2026-09-08","c":"Everyday","a":10.99,"n":"Chemist Warehouse","t":"spend","ts":0},{"id":"hxz","d":"2026-09-08","c":"From savings","a":50,"n":"","t":"fromSav","ts":0},{"id":"hy0","d":"2026-09-08","c":"Other Subs","a":30,"n":"Claude","t":"spend","ts":0},{"id":"hxt","d":"2026-09-09","c":"Money in","a":200,"n":"Cash from Dad","t":"in","ts":0},{"id":"hy1","d":"2026-09-09","c":"Everyday","a":0.7,"n":"Coffee","t":"spend","ts":0},{"id":"hy2","d":"2026-09-09","c":"Everyday","a":6.2,"n":"Coffee","t":"spend","ts":0},{"id":"hy3","d":"2026-09-09","c":"Everyday","a":13.46,"n":"Bunnings","t":"spend","ts":0},{"id":"hy4","d":"2026-09-09","c":"Groceries","a":66,"n":"Cat food","t":"spend","ts":0},{"id":"hy5","d":"2026-09-09","c":"Everyday","a":44.23,"n":"Typo","t":"spend","ts":0},{"id":"hy6","d":"2026-09-09","c":"Everyday","a":16.98,"n":"Card","t":"spend","ts":0},{"id":"hy7","d":"2026-09-09","c":"Everyday","a":22.99,"n":"Book","t":"spend","ts":0},{"id":"hy8","d":"2026-09-09","c":"Everyday","a":11.48,"n":"Snack","t":"spend","ts":0},{"id":"hy9","d":"2026-09-09","c":"Groceries","a":18.35,"n":"Coles","t":"spend","ts":0},{"id":"hya","d":"2026-09-09","c":"Groceries","a":20,"n":"Coles","t":"spend","ts":0},{"id":"hyb","d":"2026-09-09","c":"From savings","a":42,"n":"","t":"fromSav","ts":0},{"id":"hyc","d":"2026-09-09","c":"From savings","a":66,"n":"","t":"fromSav","ts":0},{"id":"hyd","d":"2026-09-09","c":"From savings","a":15,"n":"","t":"fromSav","ts":0},{"id":"hye","d":"2026-09-09","c":"Everyday","a":24.2,"n":"Yochi","t":"spend","ts":0},{"id":"hyf","d":"2026-09-09","c":"Everyday","a":10.11,"n":"Drink","t":"spend","ts":0},{"id":"hyg","d":"2026-09-10","c":"Vape","a":60,"n":"Vape","t":"spend","ts":0},{"id":"hyh","d":"2026-09-10","c":"Everyday","a":7.7,"n":"Coffee","t":"spend","ts":0},{"id":"hyi","d":"2026-09-10","c":"Everyday","a":6.31,"n":"Coffee","t":"spend","ts":0},{"id":"hyj","d":"2026-09-10","c":"Everyday","a":12.2,"n":"Lunch","t":"spend","ts":0},{"id":"hyk","d":"2026-09-10","c":"Everyday","a":2.2,"n":"Drink","t":"spend","ts":0},{"id":"hyl","d":"2026-09-10","c":"Money in","a":60,"n":"Vape","t":"in","ts":0},{"id":"hym","d":"2026-09-10","c":"From savings","a":20,"n":"","t":"fromSav","ts":0},{"id":"hyn","d":"2026-09-10","c":"From savings","a":116,"n":"","t":"fromSav","ts":0},{"id":"hyo","d":"2026-09-11","c":"Money in","a":14.1,"n":"Bunnings","t":"in","ts":0},{"id":"hyp","d":"2026-09-11","c":"Other","a":13.46,"n":"Bunnings","t":"spend","ts":0},{"id":"hyq","d":"2026-09-11","c":"Everyday","a":6.2,"n":"Coffee","t":"spend","ts":0},{"id":"hyr","d":"2026-09-11","c":"Everyday","a":5.95,"n":"Coffee","t":"spend","ts":0},{"id":"hys","d":"2026-09-11","c":"Money in","a":17,"n":"Lunch","t":"in","ts":0},{"id":"hyt","d":"2026-09-11","c":"Everyday","a":16.75,"n":"Lunch","t":"spend","ts":0},{"id":"hyu","d":"2026-09-11","c":"Everyday","a":6.1,"n":"Coffee","t":"spend","ts":0},{"id":"hyv","d":"2026-09-11","c":"From savings","a":50,"n":"","t":"fromSav","ts":0},{"id":"hyw","d":"2026-09-11","c":"From savings","a":116,"n":"","t":"fromSav","ts":0},{"id":"hxa","d":"2026-09-12","c":"Other","a":144.9,"n":"Soak South Yarra","t":"spend","ts":0},{"id":"hxb","d":"2026-09-12","c":"Other","a":151.24,"n":"Bday Dinner","t":"spend","ts":0},{"id":"hyx","d":"2026-09-12","c":"Everyday","a":51.7,"n":"Dinner","t":"spend","ts":0},{"id":"hyy","d":"2026-09-12","c":"Everyday","a":5.15,"n":"Maccas","t":"spend","ts":0},{"id":"hyz","d":"2026-09-12","c":"Everyday","a":9,"n":"Laundromat","t":"spend","ts":0},{"id":"hz0","d":"2026-09-12","c":"Everyday","a":21.99,"n":"Coffee","t":"spend","ts":0},{"id":"hz1","d":"2026-09-12","c":"Parking","a":10.2,"n":"Parking","t":"spend","ts":0},{"id":"hz2","d":"2026-09-12","c":"Everyday","a":32.5,"n":"Maccas","t":"spend","ts":0},{"id":"hz3","d":"2026-09-12","c":"Groceries","a":198.48,"n":"Coles","t":"spend","ts":0},{"id":"hz4","d":"2026-09-12","c":"Everyday","a":8.49,"n":"Amazon","t":"spend","ts":0},{"id":"hz5","d":"2026-09-12","c":"Groceries","a":25.7,"n":"Coles","t":"spend","ts":0},{"id":"hz6","d":"2026-09-12","c":"From savings","a":579,"n":"","t":"fromSav","ts":0},{"id":"hxc","d":"2026-09-13","c":"Everyday","a":27.5,"n":"Golf Cart","t":"spend","ts":0}],"rules":[{"id":"ew","name":"Edmond Wage","kind":"in","amt":5335,"freq":"monthly","start":"2026-09-14","active":true,"shift":"before","group":"Income"},{"id":"bw","name":"Brigid Wage","kind":"in","amt":2292.5,"freq":"fortnightly","start":"2026-09-18","active":true,"group":"Income"},{"id":"sav","name":"Savings","kind":"save","amt":500,"freq":"weekly","start":"2026-09-19","active":true,"group":"Savings"},{"id":"rent","name":"Rent","kind":"bill","amt":2608,"freq":"monthly","start":"2026-09-15","active":true,"group":"Home"},{"id":"hins","name":"Home insurance","kind":"bill","amt":38,"freq":"monthly","start":"2026-09-19","active":true,"group":"Home"},{"id":"int","name":"Internet","kind":"bill","amt":97.42,"freq":"monthly","start":"2026-10-07","active":true,"group":"Home"},{"id":"gas1","name":"Gas","kind":"bill","amt":146.08,"freq":"once","start":"2026-09-15","active":true,"group":"Home"},{"id":"gas","name":"Gas","kind":"bill","amt":130,"freq":"every2m","start":"2026-11-13","active":true,"group":"Home"},{"id":"elec1","name":"Electricity","kind":"bill","amt":318.2,"freq":"once","start":"2026-09-18","active":true,"group":"Home"},{"id":"elec","name":"Electricity","kind":"bill","amt":316,"freq":"quarterly","start":"2027-01-08","active":true,"group":"Home"},{"id":"donny","name":"Donnybrook","kind":"bill","amt":320,"freq":"monthly","start":"2027-01-15","active":true,"group":"Home"},{"id":"carm","name":"Car (monthly)","kind":"bill","amt":680,"freq":"monthly","start":"2026-09-15","active":true,"group":"Car"},{"id":"carf","name":"Car (fortnightly)","kind":"bill","amt":276,"freq":"fortnightly","start":"2026-09-18","active":true,"group":"Car"},{"id":"ci1","name":"Car insurance","kind":"bill","amt":98.04,"freq":"monthly","start":"2026-10-04","active":true,"group":"Car"},{"id":"ci2","name":"Car insurance 2","kind":"bill","amt":119.66,"freq":"monthly","start":"2026-10-05","active":true,"group":"Car"},{"id":"rego1","name":"Rego","kind":"bill","amt":235,"freq":"once","start":"2026-10-21","active":true,"group":"Car"},{"id":"rego2","name":"Rego","kind":"bill","amt":235,"freq":"once","start":"2026-11-15","active":true,"group":"Car"},{"id":"tolls","name":"Tolls","kind":"bill","amt":230,"freq":"monthly","start":"2026-09-30","active":true,"group":"Car"},{"id":"loan","name":"Loan","kind":"bill","amt":116,"freq":"weekly","start":"2026-09-18","active":true,"group":"Loans & BNPL"},{"id":"bnpl","name":"BNPL","kind":"bill","amt":99.75,"freq":"fortnightly","start":"2026-09-22","active":true,"end":"2026-12-29","group":"Loans & BNPL"},{"id":"ap0","name":"Afterpay","kind":"bill","amt":72.4,"freq":"once","start":"2026-09-12","active":true,"group":"Loans & BNPL"},{"id":"ap1","name":"Afterpay","kind":"bill","amt":24.95,"freq":"once","start":"2026-09-19","active":true,"group":"Loans & BNPL"},{"id":"ap2","name":"Afterpay","kind":"bill","amt":161.75,"freq":"once","start":"2026-09-26","active":true,"group":"Loans & BNPL"},{"id":"ap3","name":"Afterpay","kind":"bill","amt":24.95,"freq":"once","start":"2026-10-03","active":true,"group":"Loans & BNPL"},{"id":"ap4","name":"Afterpay","kind":"bill","amt":224.5,"freq":"once","start":"2026-10-10","active":true,"group":"Loans & BNPL"},{"id":"ap5","name":"Afterpay","kind":"bill","amt":24.94,"freq":"once","start":"2026-10-17","active":true,"group":"Loans & BNPL"},{"id":"ap6","name":"Afterpay","kind":"bill","amt":224.49,"freq":"once","start":"2026-10-24","active":true,"group":"Loans & BNPL"},{"id":"gyms","name":"Gym (Sat)","kind":"bill","amt":50,"freq":"weekly","start":"2026-09-12","active":true,"group":"Health"},{"id":"gymt","name":"Gym (Thu)","kind":"bill","amt":39.7,"freq":"weekly","start":"2026-09-17","active":true,"group":"Health"},{"id":"mf","name":"MacroFactor","kind":"bill","amt":18,"freq":"monthly","start":"2026-09-26","active":true,"group":"Subscriptions"},{"id":"g1","name":"Google One","kind":"bill","amt":4.49,"freq":"monthly","start":"2026-09-20","active":true,"group":"Subscriptions"},{"id":"atv","name":"Apple TV","kind":"bill","amt":16,"freq":"monthly","start":"2026-09-13","active":true,"group":"Subscriptions"},{"id":"yt","name":"YouTube","kind":"bill","amt":22.99,"freq":"monthly","start":"2026-09-26","active":true,"group":"Subscriptions"},{"id":"sp1","name":"Spotify","kind":"bill","amt":16,"freq":"monthly","start":"2026-09-20","active":true,"group":"Subscriptions"},{"id":"sp2","name":"Spotify (2nd)","kind":"bill","amt":16,"freq":"monthly","start":"2026-09-21","active":true,"group":"Subscriptions"},{"id":"amz","name":"Amazon","kind":"bill","amt":10,"freq":"monthly","start":"2026-09-20","active":true,"group":"Subscriptions"},{"id":"kayo","name":"Kayo","kind":"bill","amt":45.99,"freq":"monthly","start":"2026-09-19","active":true,"group":"Subscriptions"},{"id":"claude","name":"Claude","kind":"bill","amt":30,"freq":"monthly","start":"2026-10-08","active":true,"group":"Subscriptions"},{"id":"strem","name":"Stremio","kind":"bill","amt":30,"freq":"quarterly","start":"2026-11-15","active":true,"group":"Subscriptions"},{"id":"h19","name":"Hole19","kind":"bill","amt":89,"freq":"yearly","start":"2026-12-01","active":true,"group":"Subscriptions"},{"id":"groc","name":"Groceries","kind":"budget","amt":200,"freq":"weekly","start":"2026-09-12","active":true,"cat":"Groceries","group":"Budgets"},{"id":"pet","name":"Petrol","kind":"budget","amt":150,"freq":"fortnightly","start":"2026-09-24","active":true,"cat":"Petrol","group":"Budgets"},{"id":"vape","name":"Vape","kind":"budget","amt":60,"freq":"days","start":"2026-10-01","active":true,"every":21,"cat":"Vape","group":"Budgets"},{"id":"hair","name":"Haircut","kind":"budget","amt":64,"freq":"days","start":"2026-10-09","active":true,"every":28,"cat":"Haircut","group":"Budgets"}],"overrides":{},"deleted":[],"daily":{"Everyday":{"mode":"auto"},"Parking":{"mode":"manual","dow":[28,5,28,5,28,0,0]},"Other":{"mode":"auto","flat":true}},"cats":["Everyday","Groceries","Parking","Petrol","Other","Vape","Haircut","Gift"],"settings":{"buffer":200,"weeks":8,"cap":250,"horizon":31,"shared":false}};

const DAYMS = 86400000;
const DOW = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const DOW_LONG = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const FREQS = {
  weekly: "Weekly", fortnightly: "Fortnightly", monthly: "Monthly", every2m: "Every 2 months",
  quarterly: "Quarterly", yearly: "Yearly", days: "Every … days", once: "One-off",
};
const MONTH_STEP = { monthly: 1, every2m: 2, quarterly: 3, yearly: 12 };

const isoToDn = (iso) => { const [y, m, d] = iso.split("-").map(Number); return Math.round(Date.UTC(y, m - 1, d) / DAYMS); };
const dnToISO = (dn) => new Date(dn * DAYMS).toISOString().slice(0, 10);
const dnDate = (dn) => new Date(dn * DAYMS);
const dowOf = (dn) => (dnDate(dn).getUTCDay() + 6) % 7; // Mon=0
const todayDn = () => { const n = new Date(); return Math.round(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate()) / DAYMS); };
const r2 = (n) => Math.round(n * 100) / 100;
const uid = () => Math.random().toString(36).slice(2, 9) + Date.now().toString(36).slice(-4);

function monthDate(y, m, day) {
  const last = new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
  return Math.round(Date.UTC(y, m, Math.min(day, last)) / DAYMS);
}
function shiftWeekend(dn, shift) {
  const w = dowOf(dn);
  if (w < 5 || !shift) return dn;
  if (shift === "before") return dn - (w - 4);
  return dn + (7 - w);
}

// All occurrences of a rule between two day numbers (inclusive), overrides applied.
function occurrences(rule, from, to, overrides = {}) {
  const out = [];
  if (!rule.active && rule.active !== undefined) return out;
  const start = isoToDn(rule.start);
  const end = rule.end ? isoToDn(rule.end) : Infinity;
  const push = (dn) => {
    if (dn < from || dn > to || dn < start - 3 || dn > end) return;
    const key = `${rule.id}|${dnToISO(dn)}`;
    const ov = overrides[key];
    if (ov?.skip) return;
    out.push({ dn, amt: ov?.amt ?? rule.amt, base: rule.amt, key, rule, overridden: !!ov });
  };
  if (rule.freq === "once") { push(start); return out; }
  const step = rule.freq === "weekly" ? 7 : rule.freq === "fortnightly" ? 14 : rule.freq === "days" ? Math.max(1, +rule.every || 1) : 0;
  if (step) {
    let k = Math.max(0, Math.ceil((from - start) / step));
    for (let dn = start + k * step; dn <= to && dn <= end; dn += step) push(dn);
    return out;
  }
  const ms = MONTH_STEP[rule.freq] || 1;
  const s = dnDate(start);
  const day = s.getUTCDate();
  let y = s.getUTCFullYear(), m = s.getUTCMonth();
  const f = dnDate(from);
  const monthsAhead = (f.getUTCFullYear() - y) * 12 + (f.getUTCMonth() - m);
  if (monthsAhead > ms) { const jump = Math.floor((monthsAhead - 1) / ms) * ms; m += jump; y += Math.floor(m / 12); m %= 12; }
  for (let guard = 0; guard < 400; guard++) {
    const raw = monthDate(y, m, day);
    if (raw > to + 3 || raw > end) break;
    push(shiftWeekend(raw, rule.shift));
    m += ms; y += Math.floor(m / 12); m %= 12;
  }
  return out;
}
function prevOccurrence(rule, dn) {
  const back = occurrences(rule, dn - 400, dn - 1, {});
  if (back.length) return back[back.length - 1].dn;
  const step = rule.freq === "weekly" ? 7 : rule.freq === "fortnightly" ? 14 : rule.freq === "days" ? +rule.every || 7 : (MONTH_STEP[rule.freq] || 1) * 30;
  return dn - step;
}

function describeRule(r) {
  if (r.freq === "once") return "One-off";
  if (r.freq === "days") return `Every ${r.every} days`;
  if (r.freq === "weekly" || r.freq === "fortnightly") return `${FREQS[r.freq]}, ${DOW_LONG[dowOf(isoToDn(r.start))]}`;
  const d = dnDate(isoToDn(r.start)).getUTCDate();
  const sfx = d % 10 === 1 && d !== 11 ? "st" : d % 10 === 2 && d !== 12 ? "nd" : d % 10 === 3 && d !== 13 ? "rd" : "th";
  return `${FREQS[r.freq]} on the ${d}${sfx}`;
}

// Does a log entry count towards the current balance (i.e. after the last balance check)?
const afterAnchor = (log, anchor, A) => {
  const d = isoToDn(log.d);
  return d > A || (d === A && (log.ts || 0) > anchor.ts);
};
const flowOf = (log) => {
  const a = +log.a || 0;
  if (log.t === "fromSav") return [a, -a];
  if (log.t === "toSav") return [-a, a];
  if (log.t === "in") return [a, 0];
  return [-a, 0];
};

function dailyRates(state, today) {
  const W = state.settings.weeks * 7;
  const lo = today - W, hi = today - 1;
  const cnt = [0, 0, 0, 0, 0, 0, 0];
  for (let d = lo; d <= hi; d++) cnt[dowOf(d)]++;
  const cap = state.settings.cap;
  const rates = {};
  const oneOffs = [];
  const winLogs = state.logs.filter((l) => l.t === "spend" && isoToDn(l.d) >= lo && isoToDn(l.d) <= hi);
  for (const [cat, cfg] of Object.entries(state.daily)) {
    const logs = winLogs.filter((l) => l.c === cat);
    let dow;
    if (cfg.mode === "manual") dow = cfg.dow.map((v) => +v || 0);
    else if (cfg.flat) {
      let s = 0;
      logs.forEach((l) => { if (l.a <= cap) s += l.a; else oneOffs.push(l); });
      dow = Array(7).fill(s / W);
    } else {
      const sum = [0, 0, 0, 0, 0, 0, 0];
      logs.forEach((l) => (sum[dowOf(isoToDn(l.d))] += l.a));
      dow = sum.map((s, k) => (cnt[k] ? s / cnt[k] : 0));
    }
    const hist = [0, 0, 0, 0, 0, 0, 0];
    logs.forEach((l) => (hist[dowOf(isoToDn(l.d))] += l.a));
    rates[cat] = { dow, perWeek: dow.reduce((a, b) => a + b, 0), actualWk: (logs.reduce((a, l) => a + l.a, 0) / W) * 7, hist: hist.map((s, k) => (cnt[k] ? s / cnt[k] : 0)), mode: cfg.mode, flat: !!cfg.flat };
  }
  return { rates, oneOffs: oneOffs.sort((a, b) => (a.d < b.d ? 1 : -1)), W, lo, hi, winLogs };
}

function buildModel(state, SC = {}, todayOverride) {
  const { anchor, logs, rules, overrides = {}, settings } = state;
  const A = isoToDn(anchor.d);
  const today = Math.max(todayOverride ?? todayDn(), A);
  const E = today + 120;
  const H = settings.horizon;
  const cut = (SC.cut || 0) / 100;
  const skips = SC.skips || {};
  const adds = (SC.adds || []).map((a) => ({ ...a, dn: isoToDn(a.d) }));

  // 1. Balances right now
  let sp = +anchor.spending || 0, sv = +anchor.savings || 0;
  logs.forEach((l) => {
    if (isoToDn(l.d) > today || !afterAnchor(l, anchor, A)) return;
    const [a, b] = flowOf(l); sp += a; sv += b;
  });
  const fixed = rules.filter((r) => r.kind !== "budget");
  fixed.forEach((r) => occurrences(r, A + 1, today, overrides).forEach((o) => {
    if (r.kind === "in") sp += o.amt;
    else if (r.kind === "save") { sp -= o.amt; sv += o.amt; }
    else sp -= o.amt;
  }));
  const spNow = r2(sp), svNow = r2(sv);

  // 2. Daily spending estimates
  const DR = dailyRates(state, today);
  const autoCats = Object.keys(state.daily).filter((c) => state.daily[c].mode !== "manual");
  const loggedOn = {};
  logs.forEach((l) => {
    if (l.t !== "spend") return;
    const d = isoToDn(l.d);
    if (d < today) return;
    loggedOn[`${l.c}|${d}`] = (loggedOn[`${l.c}|${d}`] || 0) + l.a;
  });

  // 3. Events per future day
  const ev = {};
  const addEv = (dn, e) => (ev[dn] ||= []).push(e);
  fixed.forEach((r) => occurrences(r, today + 1, E, overrides).forEach((o) => {
    addEv(o.dn, { ...o, name: r.name, kind: r.kind, group: r.group, delta: r.kind === "in" ? o.amt : -o.amt, sav: r.kind === "save" ? o.amt : 0, skipped: !!skips[o.key] });
  }));
  rules.filter((r) => r.kind === "budget").forEach((r) => occurrences(r, today, E, overrides).forEach((o) => {
    const p0 = prevOccurrence(r, o.dn) + 1;
    const spent = logs.filter((l) => l.t === "spend" && l.c === r.cat && isoToDn(l.d) >= p0 && isoToDn(l.d) <= o.dn).reduce((a, l) => a + l.a, 0);
    const left = Math.max(0, o.amt - spent);
    addEv(o.dn, { ...o, name: r.name, kind: "budget", group: "Budgets", delta: -left, left, spent, periodStart: p0, skipped: !!skips[o.key] });
  }));
  logs.forEach((l) => {
    const d = isoToDn(l.d);
    if (d <= today || d > E) return;
    const [a, b] = flowOf(l);
    addEv(d, { key: `log|${l.id}`, name: l.n || l.c, kind: "log", log: l, amt: l.a, delta: a, sav: b });
  });
  adds.forEach((a) => addEv(a.dn, { key: `add|${a.id}`, name: a.name, kind: "whatif", amt: a.amt, delta: -a.amt }));

  // 4. Walk forward
  const days = [];
  let base = spNow, scen = spNow, savBase = svNow, savScen = svNow, runMin = Infinity;
  for (let dn = today; dn <= E; dn++) {
    const w = dowOf(dn);
    const cats = [];
    let estB = 0, estS = 0;
    for (const [cat, rt] of Object.entries(DR.rates)) {
      const ovKey = `daily:${cat}|${dnToISO(dn)}`;
      const ov = overrides[ovKey];
      const planned = ov?.skip ? 0 : ov?.amt ?? rt.dow[w];
      const logged = loggedOn[`${cat}|${dn}`] || 0;
      const left = Math.max(0, planned - logged);
      const leftS = Math.max(0, planned * (autoCats.includes(cat) ? 1 - cut : 1) - logged);
      if (planned > 0.5 || logged > 0) cats.push({ cat, planned, logged, left, key: ovKey, overridden: !!ov });
      estB += left; estS += leftS;
    }
    const list = (ev[dn] || []).sort((a, b) => (a.kind === "in" ? -1 : b.kind === "in" ? 1 : Math.abs(b.delta) - Math.abs(a.delta)));
    let dB = 0, dS = 0, sB = 0, sS = 0;
    list.forEach((e) => {
      if (e.kind === "whatif") { dS += e.delta; return; }
      dB += e.delta; sB += e.sav || 0;
      if (!e.skipped) { dS += e.delta; sS += e.sav || 0; }
    });
    base += dB - estB; scen += dS - estS; savBase += sB; savScen += sS;
    runMin = Math.min(runMin, base);
    const need = Math.max(0, settings.buffer - runMin);
    days.push({ dn, dow: w, base, scen, savBase, savScen, savReal: savBase - need, need, est: estB, estS, cats, events: list });
  }

  const metric = (key, savKey) => {
    const win = days.slice(0, H + 1);
    let lowest = Infinity, lowDn = today, firstBelow = null;
    win.forEach((d) => {
      if (d[key] < lowest) { lowest = d[key]; lowDn = d.dn; }
      if (firstBelow === null && d[key] < settings.buffer) firstBelow = d.dn;
    });
    const available = lowest - settings.buffer;
    const lowDay = days[lowDn - today];
    const endDay = days[Math.min(H, days.length - 1)];
    const nextDay = days[lowDn - today + 1];
    const payAfter = nextDay?.events.find((e) => e.kind === "in");
    return { lowest, lowDn, firstBelow, available, savAtLow: lowDay[savKey], savRealAtLow: lowDay.savReal, savRealEnd: endDay.savReal, needEnd: endDay.need, payAfter };
  };
  const mB = metric("base", "savBase");
  const mS = metric("scen", "savScen");

  // Next income and the top-up needed before it
  let nextIn = null;
  for (const d of days) { const i = d.events.find((e) => e.kind === "in" && e.amt >= 500); if (i && d.dn > today) { nextIn = { dn: d.dn, name: i.name, amt: i.amt }; break; } }
  let minBeforeIn = Infinity;
  days.slice(0, nextIn ? nextIn.dn - today : H + 1).forEach((d) => (minBeforeIn = Math.min(minBeforeIn, d.base)));
  const topUpNow = Math.max(0, settings.buffer - minBeforeIn);

  // Today
  const todayDay = days[0];
  const todayLogs = logs.filter((l) => isoToDn(l.d) === today).sort((a, b) => (b.ts || 0) - (a.ts || 0));
  const todaySpent = todayLogs.filter((l) => l.t === "spend").reduce((a, l) => a + l.a, 0);
  const todayPlanned = todayDay.cats.reduce((a, c) => a + c.planned, 0);
  const todayDailyLogged = todayDay.cats.reduce((a, c) => a + c.logged, 0);

  // Months
  const months = [];
  let cur = today + 1;
  for (let k = 0; k < 3; k++) {
    const d0 = dnDate(cur);
    const last = Math.round(Date.UTC(d0.getUTCFullYear(), d0.getUTCMonth() + 1, 0) / DAYMS);
    let income = 0, bills = 0, saved = 0, budgets = 0, daily = 0;
    for (let dn = cur; dn <= Math.min(last, E); dn++) {
      const d = days[dn - today];
      daily += d.est;
      d.events.forEach((e) => {
        if (e.kind === "in") income += e.amt;
        else if (e.kind === "save") saved += e.amt;
        else if (e.kind === "budget") budgets += e.left;
        else if (e.kind === "log") { if (e.delta > 0 && e.sav === 0) income += e.delta; else if (e.sav === 0) bills -= e.delta; }
        else if (e.kind === "bill") bills += e.amt;
      });
    }
    months.push({
      label: (k === 0 && d0.getUTCDate() > 1 ? "Rest of " : "") + d0.toLocaleDateString("en-AU", { month: "long", timeZone: "UTC" }),
      income, bills, saved, budgets, daily, left: income - bills - saved - budgets - daily,
    });
    cur = last + 1;
  }

  // Budget accuracy (actual vs budget per week)
  const budgetCheck = rules.filter((r) => r.kind === "budget").map((r) => {
    const spent = DR.winLogs.filter((l) => l.c === r.cat).reduce((a, l) => a + l.a, 0);
    const step = r.freq === "weekly" ? 7 : r.freq === "fortnightly" ? 14 : r.freq === "days" ? +r.every : (MONTH_STEP[r.freq] || 1) * 30.44;
    return { rule: r, actualWk: (spent / DR.W) * 7, budgetWk: (r.amt / step) * 7, actualPer: (spent / DR.W) * step };
  });

  // Top notes per category (for quick-pick chips) from all history
  const noteFreq = {};
  logs.forEach((l) => {
    if (!l.n) return;
    const k = `${l.c}|${l.n.trim().toLowerCase()}`;
    const e = (noteFreq[k] ||= { c: l.c, n: l.n.trim(), count: 0, last: 0 });
    e.count++; e.last = Math.max(e.last, isoToDn(l.d));
  });
  const topNotes = {};
  Object.values(noteFreq).forEach((e) => (topNotes[e.c] ||= []).push(e));
  Object.values(topNotes).forEach((a) => a.sort((x, y) => y.count - x.count || y.last - x.last));

  // Where it goes (window)
  const descMap = {};
  DR.winLogs.forEach((l) => {
    if (!state.daily[l.c] || l.a > settings.cap) return;
    const k = (l.n || l.c).trim().toLowerCase();
    const e = (descMap[k] ||= { label: (l.n || l.c).trim(), total: 0, count: 0 });
    e.total += l.a; e.count++;
  });
  const topDescs = Object.values(descMap).sort((a, b) => b.total - a.total).slice(0, 8).map((d) => ({ ...d, perWeek: (d.total / DR.W) * 7 }));

  // Weekly picture: every outgoing per week over the lookback window vs what's planned ahead
  const catTotals = {};
  let oneOffTotal = 0;
  DR.winLogs.forEach((l) => {
    if (l.a > settings.cap) { oneOffTotal += l.a; return; }
    catTotals[l.c] = (catTotals[l.c] || 0) + l.a;
  });
  const spendWk = Object.entries(catTotals).map(([cat, total]) => ({ cat, perWeek: (total / DR.W) * 7 })).sort((a, b) => b.perWeek - a.perWeek);
  const oneOffWk = (oneOffTotal / DR.W) * 7;

  // A typical week over the next four weeks, straight from the forecast
  const wk = { income: 0, bills: 0, saved: 0, spending: 0 };
  const AH = Math.min(28, days.length - 1);
  for (let k = 1; k <= AH; k++) {
    const d = days[k];
    wk.spending += d.est;
    d.events.forEach((e) => {
      if (e.kind === "in") wk.income += e.amt;
      else if (e.kind === "save") wk.saved += e.amt;
      else if (e.kind === "budget") wk.spending += e.left;
      else if (e.kind === "bill") wk.bills += e.amt;
      else if (e.kind === "log") { if (e.sav === 0) { if (e.delta > 0) wk.income += e.delta; else wk.bills -= e.delta; } }
    });
  }
  Object.keys(wk).forEach((k) => (wk[k] = (wk[k] / AH) * 7));
  wk.left = wk.income - wk.bills - wk.saved - wk.spending;

  // Savings flows over the lookback window
  const winAll = logs.filter((l) => isoToDn(l.d) >= DR.lo && isoToDn(l.d) <= DR.hi);
  const fromSavWk = (winAll.filter((l) => l.t === "fromSav").reduce((a, l) => a + l.a, 0) / DR.W) * 7;
  const savRule = rules.filter((r) => r.kind === "save").reduce((a, r) => a + (r.freq === "weekly" ? r.amt : r.freq === "fortnightly" ? r.amt / 2 : r.amt / 4.33), 0);

  return {
    today, A, H, spNow, svNow, days, base: mB, scen: mS, nextIn, topUpNow,
    rates: DR.rates, oneOffs: DR.oneOffs, W: DR.W, months, budgetCheck, topNotes, topDescs, spendWk, oneOffWk, wk,
    todayDay, todayLogs, todaySpent, todayPlanned, todayDailyLogged, fromSavWk, savRuleWk: savRule,
    everydayWk: Object.entries(DR.rates).filter(([c]) => autoCats.includes(c)).reduce((a, [, r]) => a + r.perWeek, 0),
    dailyWk: Object.values(DR.rates).reduce((a, r) => a + r.perWeek, 0),
  };
}

const STORE_KEY = "bf2:state";
const SHARED_KEY = "bf2:shared";
const CAT_COLORS = ["#0EB2FF", "#F5D04E", "#7C6BFF", "#3ED9A4", "#FF8AC2", "#5AD1E6"];
const LOG_TYPES = [["spend", "Spend"], ["moneyIn", "Money in"], ["toSav", "To savings"]];
const SOURCES = [["fromSav", "From savings"], ["in", "From someone"]];
const KIND_LABEL = { in: "Income", save: "Savings", bill: "Bill", budget: "Budget" };
const NAV = [
  ["overview", "Overview", "M4 11.2 12 4l8 7.2V19a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z"],
  ["forecast", "Forecast", "M4 16.5 9 11l3.5 3.2L20 6.5M20 6.5h-4.6M20 6.5v4.4M4 20h16"],
  ["log", "Log", "M5 6h14M5 12h14M5 18h9"],
  ["plan", "Plan", "M12 4v16M4.5 8h15M4.5 16h15M8 4.5v15M16 4.5v15"],
];

const money = (n, cents = false) => {
  const v = Math.abs(n || 0).toLocaleString("en-AU", { minimumFractionDigits: cents ? 2 : 0, maximumFractionDigits: cents ? 2 : 0 });
  return (n < -0.004 ? "−$" : "$") + v;
};
const dl = (dn, o = { day: "numeric", month: "short" }) => dnDate(dn).toLocaleDateString("en-AU", { timeZone: "UTC", ...o });
const dayName = (dn, today) => (dn === today ? "Today" : dn === today + 1 ? "Tomorrow" : dn === today - 1 ? "Yesterday" : dl(dn, { weekday: "long", day: "numeric", month: "short" }));
const QUAL = /\s*\(([^)]+)\)/;
function Name({ children }) {
  const s = String(children ?? "");
  const m = s.match(QUAL);
  if (!m) return <>{s}</>;
  return <>{s.replace(QUAL, "")} <span className="qual">{m[1]}</span></>;
}
const clean = (s) => String(s).replace(/[^\d.]/g, "");
const sortLogs = (logs) => [...logs].sort((a, b) => (a.d < b.d ? 1 : a.d > b.d ? -1 : (b.ts || 0) - (a.ts || 0)));

/* ---------- storage ---------- */
async function sGet(key, shared) {
  try { const r = await window.storage.get(key, shared); return r ? JSON.parse(r.value) : null; } catch { return null; }
}
async function sSet(key, val, shared) {
  try { const r = await window.storage.set(key, JSON.stringify(val), shared); return !!r; } catch { return false; }
}
const HORIZONS = [14, 31, 62, 92];
function migrate(s) {
  if (s?.settings && !HORIZONS.includes(s.settings.horizon)) {
    s = { ...s, settings: { ...s.settings, horizon: HORIZONS.reduce((a, b) => (Math.abs(b - s.settings.horizon) < Math.abs(a - s.settings.horizon) ? b : a)) } };
  }
  if (!s || (s.v || 1) >= 3) return s;
  const map = { Edmond: "Everyday", Brigid: "Everyday", Birthdays: "Gift" };
  const daily = { Everyday: { mode: "auto" }, ...Object.fromEntries(Object.entries(s.daily || {}).filter(([k]) => !map[k])) };
  return {
    ...s, v: 3,
    logs: s.logs.map((l) => (map[l.c] ? { ...l, c: map[l.c] } : l)),
    cats: Array.from(new Set((s.cats || []).map((c) => map[c] || c))),
    daily,
  };
}
function mergeStates(a, b) {
  if (!b) return a;
  if (!a) return b;
  const deleted = Array.from(new Set([...(a.deleted || []), ...(b.deleted || [])]));
  const del = new Set(deleted);
  const byId = {};
  [...a.logs, ...b.logs].forEach((l) => { const c = byId[l.id]; if (!c || (l.u || l.ts || 0) > (c.u || c.ts || 0)) byId[l.id] = l; });
  const logs = Object.values(byId).filter((l) => !del.has(l.id)).sort((x, y) => (x.d < y.d ? -1 : x.d > y.d ? 1 : (x.ts || 0) - (y.ts || 0)));
  const cfg = (a.cfgUpdated || 0) >= (b.cfgUpdated || 0) ? a : b;
  const anchor = (a.anchor.ts || 0) >= (b.anchor.ts || 0) ? a.anchor : b.anchor;
  return { ...cfg, anchor, logs, deleted, updated: Math.max(a.updated || 0, b.updated || 0) };
}

/* ---------- primitives ---------- */
function Sheet({ title, heading, onClose, children }) {
  useEffect(() => {
    const k = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [onClose]);
  return (
    <div className="sheet-bg" onClick={onClose}>
      <div className="sheet" role="dialog" aria-modal="true" aria-label={title} onClick={(e) => e.stopPropagation()}>
        <div className="sheet-head"><h2>{heading || title}</h2><button className="x" aria-label="Close" onClick={onClose}>×</button></div>
        {children}
      </div>
    </div>
  );
}
function Seg({ options, value, onChange, label, small, wrap }) {
  return (
    <div className={`seg${small ? " sm" : ""}${wrap ? " wrap" : ""}`} role="radiogroup" aria-label={label}>
      {options.map(([v, t]) => <button key={v} role="radio" aria-checked={value === v} className={value === v ? "on" : ""} onClick={() => onChange(v)}>{t}</button>)}
    </div>
  );
}
function Toggle({ on, onChange, label }) {
  return <button className={`tog ${on ? "on" : ""}`} role="switch" aria-checked={on} aria-label={label} onClick={() => onChange(!on)}><span /></button>;
}
function Bar({ value, max, color = "#5B5FEF" }) {
  return <div className="bar"><span style={{ width: `${Math.max(2, Math.min(100, (value / (max || 1)) * 100))}%`, background: color }} /></div>;
}
function Runway({ M, buffer, selected, onPick }) {
  const C = { line: "#0EB2FF", soft: "rgba(255,255,255,.28)", fill0: "#0EB2FF", low: "#FF6B8B" };
  const pts = M.days.slice(0, M.H + 1);
  const w = 320, h = 70, pad = 8;
  const vals = pts.map((d) => d.base).concat([0, buffer]);
  const lo = Math.min(...vals), hi = Math.max(...vals);
  const y = (v) => pad + (1 - (v - lo) / (hi - lo || 1)) * (h - pad * 2);
  const x = (k) => (k / Math.max(pts.length - 1, 1)) * w;
  const path = pts.map((d, k) => `${k ? "L" : "M"}${x(k).toFixed(1)},${y(d.base).toFixed(1)}`).join(" ");
  const lowK = pts.findIndex((d) => d.dn === M.base.lowDn);
  const selK = selected != null ? selected - M.today : -1;
  const pick = (e) => {
    if (!onPick) return;
    const r = e.currentTarget.getBoundingClientRect();
    const k = Math.round(((e.clientX - r.left) / r.width) * (pts.length - 1));
    onPick(M.today + Math.max(0, Math.min(pts.length - 1, k)));
  };
  const ticks = [0, 0.34, 0.67, 1].map((p) => pts[Math.round(p * (pts.length - 1))]?.dn).filter((v) => v != null);
  return (
    <>
    <svg viewBox={`0 0 ${w} ${h}`} className="runway" onClick={pick} role="img" aria-label={`Balance over the next ${Math.round(M.H / 7)} weeks`}>
      <defs><linearGradient id="rw" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor={C.fill0} stopOpacity=".26" /><stop offset="1" stopColor={C.fill0} stopOpacity="0" /></linearGradient></defs>
      {lo < 0 && <rect x="0" y={y(0)} width={w} height={h - y(0)} fill={C.low} opacity=".09" />}
      <line x1="0" x2={w} y1={y(buffer)} y2={y(buffer)} stroke={C.soft} strokeDasharray="2 4" />
      <path d={`${path} L${w},${h} L0,${h} Z`} fill="url(#rw)" />
      <path d={path} fill="none" stroke={C.line} strokeWidth="2.2" strokeLinejoin="round" />
      {lowK >= 0 && <circle cx={x(lowK)} cy={y(pts[lowK].base)} r="4" fill={C.low} stroke="#0B0E1E" strokeWidth="2" />}
      {selK >= 0 && selK < pts.length && (
        <g><line x1={x(selK)} x2={x(selK)} y1="0" y2={h} stroke={C.soft} /><circle cx={x(selK)} cy={y(pts[selK].base)} r="4.5" fill="#0B0E1E" stroke={C.line} strokeWidth="2.5" /></g>
      )}
    </svg>
    <div className="rw-axis" aria-hidden="true">{ticks.map((dn, k) => <span key={dn} className={k === 0 ? "first" : k === ticks.length - 1 ? "last" : ""}>{dl(dn)}</span>)}</div>
    </>
  );
}
const niceStep = (span) => {
  const raw = span / 3;
  const mag = Math.pow(10, Math.floor(Math.log10(Math.abs(raw) || 1)));
  return [1, 2, 2.5, 5, 10].map((m) => m * mag).find((s) => s >= raw) || mag * 10;
};
const axisMoney = (v) => (Math.abs(v) >= 1000 ? `${v < 0 ? "−" : ""}$${(Math.abs(v) / 1000).toFixed(1)}k` : `${v < 0 ? "−" : ""}$${Math.abs(Math.round(v))}`);

function BalanceChart({ M, buffer, compare }) {
  const [hover, setHover] = useState(null);
  const data = M.days.slice(0, M.H + 1);
  const n = data.length;
  const kA = compare ? "scen" : "base";
  const kB = compare ? "base" : "savReal";
  const labels = compare ? ["With what-ifs", "As planned"] : ["Balance", "Savings after top-ups"];
  const colB = compare ? "rgba(255,255,255,.5)" : "#F5D04E";

  const W = 320, H = 172, padL = 40, padR = 6, padT = 10, padB = 20;
  const vals = data.flatMap((d) => [d[kA], d[kB]]).concat([0, buffer]);
  const step = niceStep(Math.max(...vals) - Math.min(...vals) || 1);
  const lo = Math.floor(Math.min(...vals) / step) * step;
  const hi = Math.ceil(Math.max(...vals) / step) * step;
  const y = (v) => padT + (1 - (v - lo) / (hi - lo || 1)) * (H - padT - padB);
  const x = (i) => padL + (i / Math.max(n - 1, 1)) * (W - padL - padR);
  const path = (k) => data.map((d, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(d[k]).toFixed(1)}`).join(" ");
  const yTicks = [];
  for (let v = lo; v <= hi + 0.001; v += step) yTicks.push(v);
  const xTicks = [0, 0.34, 0.67, 1].map((p) => Math.round(p * (n - 1)));

  const at = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const i = Math.round(((e.clientX - r.left) / r.width) * (n - 1));
    setHover(Math.max(0, Math.min(n - 1, i)));
  };
  const h = hover != null ? data[hover] : null;

  return (
    <div className="chart">
      <div className="chart-wrap">
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${labels[0]} over the next ${Math.round(M.H / 7)} weeks`}
          onPointerDown={at} onPointerMove={(e) => e.buttons && at(e)} onPointerLeave={() => setHover(null)}>
          <defs>
            <linearGradient id="cg" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#0EB2FF" stopOpacity=".38" />
              <stop offset="1" stopColor="#0EB2FF" stopOpacity="0" />
            </linearGradient>
          </defs>
          {yTicks.map((v) => (
            <g key={v}>
              <line x1={padL} x2={W - padR} y1={y(v)} y2={y(v)} stroke="rgba(255,255,255,.07)" />
              <text x={padL - 6} y={y(v) + 3.5} textAnchor="end" fontSize="9" fill="#8C93AD">{axisMoney(v)}</text>
            </g>
          ))}
          {lo < 0 && <line x1={padL} x2={W - padR} y1={y(0)} y2={y(0)} stroke="#FF6B8B" strokeOpacity=".55" />}
          <line x1={padL} x2={W - padR} y1={y(buffer)} y2={y(buffer)} stroke="rgba(255,255,255,.22)" strokeDasharray="3 4" />
          <path d={`${path(kA)} L${x(n - 1)},${y(lo)} L${padL},${y(lo)} Z`} fill="url(#cg)" />
          <path d={path(kB)} fill="none" stroke={colB} strokeWidth="1.6" strokeLinejoin="round" strokeDasharray={compare ? "5 4" : undefined} />
          <path d={path(kA)} fill="none" stroke="#0EB2FF" strokeWidth="2.2" strokeLinejoin="round" />
          {xTicks.map((i) => (
            <text key={i} x={x(i)} y={H - 6} textAnchor={i === 0 ? "start" : i === n - 1 ? "end" : "middle"} fontSize="9" fill="#8C93AD">{dl(data[i].dn)}</text>
          ))}
          {h && (
            <g>
              <line x1={x(hover)} x2={x(hover)} y1={padT} y2={H - padB} stroke="rgba(255,255,255,.35)" />
              <circle cx={x(hover)} cy={y(h[kA])} r="3.6" fill="#0EB2FF" stroke="#0B0E1E" strokeWidth="1.6" />
              <circle cx={x(hover)} cy={y(h[kB])} r="3" fill={colB} stroke="#0B0E1E" strokeWidth="1.4" />
            </g>
          )}
        </svg>
        {h && (
          <div className="tip" style={{ left: `${Math.min(76, Math.max(2, ((x(hover) - padL) / (W - padL - padR)) * 100))}%` }}>
            <b>{dl(h.dn, { weekday: "short", day: "numeric", month: "short" })}</b>
            <span>{labels[0]} {money(h[kA])}</span>
            <span>{labels[1]} {money(h[kB])}</span>
          </div>
        )}
      </div>
      <div className="legend">
        <span><i style={{ background: "#0EB2FF" }} />{labels[0]}</span>
        <span><i style={{ background: colB }} />{labels[1]}</span>
        <span><i className="dash" />${buffer} buffer</span>
      </div>
    </div>
  );
}

function DayItems({ day, openOverride, openLog, empty }) {
  const items = [...day.events.filter((e) => !(e.kind === "budget" && e.left < 0.5)), ...day.cats.filter((c) => c.left > 0.5 || c.overridden).map((c) => ({ est: true, ...c }))];
  if (!items.length) return <p className="fine">{empty || "Nothing due, just your usual spending."}</p>;
  return (
    <ul className="items">
      {items.map((e) => (
        <li key={e.key}>
          <button onClick={() => (e.kind === "log" ? openLog(e.log) : e.kind === "whatif" ? null : openOverride({
            key: e.key, name: e.est ? e.cat : e.name, dn: day.dn, amt: e.est ? e.planned : e.amt, daily: !!e.est, budget: e.kind === "budget", overridden: e.overridden,
          }))}>
            <span className={`dot ${e.est ? "est" : e.kind}`} aria-hidden="true" />
            <span className="name">
              <Name>{e.est ? e.cat : e.name}</Name>
              <small>{e.est ? "Expected spending" : e.kind === "in" ? "Income" : e.kind === "save" ? "To savings" : e.kind === "budget" ? `Budget, ${money(e.spent)} used` : e.kind === "log" ? "Logged" : e.kind === "whatif" ? "What if" : "Bill"}</small>
            </span>
            <span className={e.kind === "in" || (e.kind === "log" && e.delta > 0) ? "pos" : ""}>
              {e.kind === "in" || (e.kind === "log" && e.delta > 0) ? "+" : ""}{money(e.est ? e.left : e.kind === "budget" ? e.left : e.amt)}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}

/* ---------- Overview ---------- */
function Overview({ st, M, sel, setSel, openLog, openReconcile, confirmAnchor, openOverride, go }) {
  const S = st.settings, B = M.base;
  const day = M.days[Math.max(0, Math.min(sel - M.today, M.days.length - 1))];
  const spent = st.logs.filter((l) => l.t === "spend" && isoToDn(l.d) === day.dn).reduce((a, l) => a + l.a, 0);
  const isToday = day.dn === M.today;
  const maxWk = Math.max(...M.spendWk.map((s) => s.perWeek), 1);
  return (
    <>
      {!st.anchor.confirmed && <Onboard M={M} confirm={confirmAnchor} />}

      <section className="hero">
        <div className="hero-top">
          <span>Available to spend</span>
          <span className="pill">{Math.round(M.H / 7)} weeks</span>
        </div>
        <div className={`hero-amt ${B.available < 0 ? "short" : ""}`}>{money(B.available)}</div>
        <div className="hero-legend">
          <span><i className="d1" />Saved {money(M.svNow)}</span>
          <span><i className="d2" />In the account {money(M.spNow, true)}</span>
        </div>
        <button className="hero-btn" onClick={openReconcile}>Update balances</button>
      </section>

      <section className="card">
        <div className="stepper">
          <button aria-label="Previous day" disabled={sel <= M.today} onClick={() => setSel(sel - 1)}>‹</button>
          <div>
            <b>{dayName(day.dn, M.today)}</b>
            <small>Balance {money(day.base)}</small>
          </div>
          <button aria-label="Next day" disabled={sel >= M.today + M.H} onClick={() => setSel(sel + 1)}>›</button>
        </div>
        <div className="day-sum">
          <div><small>{isToday ? "Spent so far" : "Expected spending"}</small><b>{money(isToday ? spent : day.est, isToday)}</b></div>
          <div><small>{isToday ? "Still expected" : "Bills due"}</small><b>{money(isToday ? day.est : day.events.filter((e) => e.kind === "bill" || e.kind === "save").reduce((a, e) => a + e.amt, 0))}</b></div>
          <div><small>Savings</small><b>{money(day.savBase)}</b></div>
        </div>
        <DayItems day={day} openOverride={openOverride} openLog={openLog} empty={isToday ? "Nothing left to expect today." : undefined} />
        {sel !== M.today && <button className="link" onClick={() => setSel(M.today)}>Back to today</button>}
      </section>

      <section className="card bottom">
        <div className="row-between">
          <div><small>Lowest point</small><b>{dl(B.lowDn, { weekday: "long", day: "numeric", month: "short" })}</b></div>
          <div className="right"><b className={B.lowest < 0 ? "neg" : ""}>{money(B.lowest)}</b><small>{B.payAfter ? `Before ${B.payAfter.name}` : "In the next " + Math.round(M.H / 7) + " weeks"}</small></div>
        </div>
        <Runway M={M} buffer={S.buffer} selected={sel} onPick={setSel} />
        <p className="fine">{B.available < 0
          ? `${money(-B.available)} short of your $${S.buffer} buffer, so that comes out of savings. Savings would sit around ${money(B.savRealAtLow)} then.`
          : `You could spend ${money(B.available)} more and still keep $${S.buffer} in the account.`}</p>
      </section>

      <section className="card">
        <div className="row-between"><h2>Where the money goes</h2><button className="link" onClick={() => go("log")}>Log</button></div>
        <p className="fine">Per week, averaged over the last {st.settings.weeks} weeks.</p>
        <ul className="bars">
          {M.spendWk.slice(0, 6).map((s, j) => (
            <li key={s.cat}>
              <div className="row-between"><span>{s.cat}</span><span>{money(s.perWeek)}</span></div>
              <Bar value={s.perWeek} max={maxWk} color={CAT_COLORS[j % 6]} />
            </li>
          ))}
        </ul>
        <p className="fine">{M.oneOffWk > 1 ? `Plus about ${money(M.oneOffWk)} a week of one-offs over ${money(st.settings.cap)}, which aren't in the forecast.` : "No one-offs in that time."}</p>
        <h2 className="sub">A typical week ahead</h2>
        <div className="wk">
          <div><small>Income</small><b className="pos">{money(M.wk.income)}</b></div>
          <div><small>Bills</small><b>{money(M.wk.bills)}</b></div>
          <div><small>Spending</small><b>{money(M.wk.spending)}</b></div>
          <div><small>Savings</small><b>{money(M.wk.saved)}</b></div>
        </div>
        <p className="fine">{M.wk.left < 0 ? `That leaves you ${money(-M.wk.left)} short each week, which is what pulls money back out of savings.` : `That leaves about ${money(M.wk.left)} spare each week.`}</p>
      </section>
    </>
  );
}

function Onboard({ M, confirm }) {
  const [sp, setSp] = useState(M.spNow.toFixed(2));
  const [sv, setSv] = useState(M.svNow.toFixed(2));
  return (
    <section className="card onboard">
      <h2>Set your starting balances</h2>
      <p>These came across from the sheet. Enter what your bank app shows now, and the app keeps them updated from there.</p>
      <div className="form-row">
        <label>Spending account<input inputMode="decimal" value={sp} onChange={(e) => setSp(clean(e.target.value))} /></label>
        <label>Savings<input inputMode="decimal" value={sv} onChange={(e) => setSv(clean(e.target.value))} /></label>
      </div>
      <button className="primary wide" onClick={() => confirm(+sp || 0, +sv || 0)}>Save balances</button>
    </section>
  );
}

/* ---------- Forecast ---------- */
function Forecast({ st, M, setSettings, SC, setSC, openOverride, openLog, addToPlan }) {
  const S = st.settings;
  const [open, setOpen] = useState({ 0: true });
  const [wi, setWi] = useState({ name: "", amt: "", d: dnToISO(M.today + 7) });
  const weeks = useMemo(() => {
    const out = [];
    M.days.slice(0, M.H + 1).forEach((d) => { if (!out.length || d.dow === 0) out.push({ start: d.dn, days: [] }); out[out.length - 1].days.push(d); });
    return out;
  }, [M]);
  const changed = SC.cut > 0 || SC.adds.length > 0;
  const dLow = M.scen.lowest - M.base.lowest;
  const mon = M.months[0];
  return (
    <>
      <section className="card">
        <div className="row-between">
          <h2>Balance forecast</h2>
          <Seg label="How far ahead" small value={S.horizon} onChange={(v) => setSettings({ horizon: v })} options={[[14, "2w"], [31, "1m"], [62, "2m"], [92, "3m"]]} />
        </div>
        <BalanceChart M={M} buffer={S.buffer} compare={changed} />
        <div className="kpis">
          <div><small>Lowest</small><b className={M.base.lowest < 0 ? "neg" : ""}>{money(M.base.lowest)}</b><em>{dl(M.base.lowDn)}</em></div>
          <div><small>Top-ups needed</small><b>{money(M.base.needEnd)}</b><em>To {dl(M.today + M.H)}</em></div>
          <div><small>Savings then</small><b>{money(M.base.savRealEnd)}</b><em>After top-ups</em></div>
        </div>
      </section>

      <section className="card">
        <h2>Month by month</h2>
        <ul className="events">
          {M.months.map((m) => (
            <li key={m.label}>
              <span className="name wrap2">{m.label}<small>In {money(m.income)}, bills {money(m.bills)}, spending {money(m.daily + m.budgets)}, savings {money(m.saved)}</small></span>
              <span className={m.left < 0 ? "neg" : "pos"}>{m.left > 0 ? "+" : ""}{money(m.left)}</span>
            </li>
          ))}
        </ul>
        <p className="fine">{mon.left < 0 ? `A shortfall means savings covers the gap that month.` : `A surplus stays in the account on top of what you've already put away.`}</p>
      </section>

      <section className="card">
        <h2>What if</h2>
        <p className="fine">Test a purchase or a spending cut. Nothing changes until you add it to your plan.</p>
        <div className="form">
          <input aria-label="What is it" placeholder="What is it?" value={wi.name} onChange={(e) => setWi({ ...wi, name: e.target.value })} />
          <input aria-label="Amount" inputMode="decimal" placeholder="$ amount" value={wi.amt} onChange={(e) => setWi({ ...wi, amt: clean(e.target.value) })} />
          <label className="datefield">When<input aria-label="Date" type="date" value={wi.d} onChange={(e) => setWi({ ...wi, d: e.target.value })} /></label>
          <button className="ghost" disabled={!+wi.amt || !wi.d} onClick={() => { setSC({ ...SC, adds: [...SC.adds, { id: uid(), name: wi.name.trim() || "Purchase", amt: +wi.amt, d: wi.d }] }); setWi({ ...wi, name: "", amt: "" }); }}>Try it</button>
        </div>
        <div className="set">
          <div className="row-between"><span>Cut everyday spending</span><b>{SC.cut}%</b></div>
          <input type="range" min="0" max="50" step="5" value={SC.cut} aria-label="Cut everyday spending" onChange={(e) => setSC({ ...SC, cut: +e.target.value })} />
        </div>
        {SC.adds.length > 0 && (
          <ul className="events">
            {SC.adds.map((a) => (
              <li key={a.id}>
                <span className="date">{dl(isoToDn(a.d))}</span><span className="name"><Name>{a.name}</Name></span><span>{money(a.amt)}</span>
                <button className="mini" onClick={() => { addToPlan(a); setSC({ ...SC, adds: SC.adds.filter((b) => b.id !== a.id) }); }}>Add to plan</button>
                <button className="x" aria-label={`Remove ${a.name}`} onClick={() => setSC({ ...SC, adds: SC.adds.filter((b) => b.id !== a.id) })}>×</button>
              </li>
            ))}
          </ul>
        )}
        {changed && (
          <>
            <div className="vs">
              <div><small>Lowest now</small><b>{money(M.base.lowest)}</b></div>
              <div className="arrow" aria-hidden="true">›</div>
              <div className={dLow >= 0 ? "good" : "bad"}><small>With what-ifs</small><b>{money(M.scen.lowest)}</b><em>{dLow >= 0 ? `${money(dLow)} better off` : `${money(-dLow)} worse off`}</em></div>
            </div>
            <button className="link" onClick={() => setSC({ cut: 0, adds: [], skips: {} })}>Clear what-ifs</button>
          </>
        )}
      </section>

      {weeks.map((w, k) => {
        const low = Math.min(...w.days.map((d) => d.base));
        const isOpen = !!open[k];
        return (
          <section key={w.start} className="card week">
            <button className="week-head" aria-expanded={isOpen} onClick={() => setOpen({ ...open, [k]: !isOpen })}>
              <span>Week of {dl(w.start, { weekday: "short", day: "numeric", month: "short" })}</span>
              <span className={low < S.buffer ? "neg" : "muted"}>Low {money(low)}</span>
              <span className={`caret ${isOpen ? "up" : ""}`} aria-hidden="true" />
            </button>
            {isOpen && (
              <ul className="days">
                {w.days.map((d) => (
                  <li key={d.dn} className={d.base < S.buffer ? "low" : ""}>
                    <div className="d-date"><b>{dl(d.dn, { weekday: "short" })}</b><span>{dl(d.dn, { day: "numeric" })}</span></div>
                    <div className="d-chips">
                      {d.events.filter((e) => !(e.kind === "budget" && e.left < 0.5)).map((e) => (
                        <button key={e.key} className={`c ${e.kind}`} onClick={() => e.kind === "log" ? openLog(e.log) : e.kind === "whatif" ? null
                          : openOverride({ key: e.key, name: e.name, dn: d.dn, amt: e.amt, overridden: e.overridden, budget: e.kind === "budget" })}>
                          <Name>{e.name}</Name> {e.kind === "in" || (e.kind === "log" && e.delta > 0) ? "+" : ""}{money(e.kind === "budget" ? e.left : e.amt)}
                        </button>
                      ))}
                      {d.est > 0.5 && <button className="c est" onClick={() => openOverride({ key: d.cats[0]?.key, name: d.cats[0]?.cat, dn: d.dn, amt: d.cats[0]?.planned, daily: true })}>Spending ~{money(d.est)}</button>}
                    </div>
                    <div className="d-bal"><b>{money(d.base)}</b><small>Saved {money(d.savBase)}</small></div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        );
      })}
    </>
  );
}

/* ---------- Log ---------- */
function LogTab({ st, M, openLog, openOverride, go }) {
  const [limit, setLimit] = useState(40);
  const [view, setView] = useState("upcoming");
  const upcoming = [];
  for (const d of M.days.slice(1, M.H + 1)) for (const e of d.events) if (e.kind !== "log" && !(e.kind === "budget" && e.left < 1)) upcoming.push({ ...e, dn: d.dn });
  const logs = sortLogs(st.logs).slice(0, limit);
  const byDay = [];
  logs.forEach((l) => { const d = isoToDn(l.d); if (!byDay.length || byDay[byDay.length - 1].d !== d) byDay.push({ d, list: [] }); byDay[byDay.length - 1].list.push(l); });
  const upByDay = [];
  upcoming.forEach((e) => { if (!upByDay.length || upByDay[upByDay.length - 1].d !== e.dn) upByDay.push({ d: e.dn, list: [] }); upByDay[upByDay.length - 1].list.push(e); });
  return (
    <>
      <Seg label="View" value={view} onChange={setView} options={[["upcoming", "Upcoming"], ["recent", "Recent"]]} />
      {view === "upcoming" ? (
        <section className="card">
          <p className="fine">Everything due in the next {Math.round(M.H / 7)} weeks. Tap an item to change or skip it for that date.</p>
          {upByDay.map((g) => (
            <div key={g.d} className="group">
              <div className="row-between group-head"><span>{dayName(g.d, M.today)}</span><span>{money(g.list.reduce((a, e) => a + (e.kind === "in" ? 0 : e.kind === "budget" ? e.left : e.amt), 0))}</span></div>
              <ul className="items">
                {g.list.map((e) => (
                  <li key={e.key}>
                    <button onClick={() => openOverride({ key: e.key, name: e.name, dn: g.d, amt: e.amt, budget: e.kind === "budget", overridden: e.overridden })}>
                      <span className={`dot ${e.kind}`} aria-hidden="true" />
                      <span className="name"><Name>{e.name}</Name><small>{e.kind === "in" ? "Income" : e.kind === "save" ? "To savings" : e.kind === "budget" ? "Budget" : "Bill"}</small></span>
                      <span className={e.kind === "in" ? "pos" : ""}>{e.kind === "in" ? "+" : ""}{money(e.kind === "budget" ? e.left : e.amt)}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <button className="link" onClick={() => go("plan")}>Change a regular amount in Plan</button>
        </section>
      ) : (
        <section className="card">
          {byDay.length === 0 && <p className="fine">Nothing logged yet. Tap Log to add your first entry.</p>}
          {byDay.map((g) => {
            const sp = g.list.filter((l) => l.t === "spend").reduce((a, l) => a + l.a, 0);
            return (
              <div key={g.d} className="group">
                <div className="row-between group-head"><span>{dayName(g.d, M.today)}</span><span>{money(sp, true)}</span></div>
                <ul className="items">
                  {g.list.map((l) => (
                    <li key={l.id}>
                      <button onClick={() => openLog(l)}>
                        <span className={`dot ${l.t === "spend" ? "bill" : l.t === "toSav" ? "save" : "in"}`} aria-hidden="true" />
                        <span className="name"><Name>{l.n || l.c}</Name><small>{l.t === "spend" ? l.c : l.t === "fromSav" ? "From savings" : l.t === "toSav" ? "To savings" : "From someone"}</small></span>
                        <span className={l.t === "spend" || l.t === "toSav" ? "" : "pos"}>{l.t === "spend" || l.t === "toSav" ? "" : "+"}{money(l.a, true)}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
          {st.logs.length > limit && <button className="ghost wide" onClick={() => setLimit(limit + 60)}>Show more</button>}
        </section>
      )}
    </>
  );
}

/* ---------- Plan ---------- */
function Plan({ st, M, editRule, editDaily, updRule }) {
  const futureOnce = (r) => r.freq !== "once" || isoToDn(r.start) >= M.today;
  const next = (r) => occurrences(r, M.today, M.today + 800, st.overrides)[0];
  const rows = (list) => list.filter(futureOnce).map((r) => ({ r, n: next(r) })).sort((a, b) => (a.n?.dn ?? 1e9) - (b.n?.dn ?? 1e9));
  const groups = {};
  st.rules.filter((r) => r.kind === "bill").forEach((r) => (groups[r.group || "Other bills"] ||= []).push(r));
  const Row = ({ r, n }) => (
    <li>
      <button onClick={() => editRule(r)}>
        <span className="name"><Name>{r.name}</Name><small>{describeRule(r)}{n ? ` · Next ${dl(n.dn, { weekday: "short", day: "numeric", month: "short" })}` : " · Nothing upcoming"}</small></span>
        <span className={r.kind === "in" ? "pos" : ""}>{money(r.amt, r.amt % 1 !== 0)}</span>
      </button>
    </li>
  );
  const Section = ({ title, list, kind, sub }) => (
    <section className="card">
      <div className="row-between"><h2>{title}</h2><button className="link" onClick={() => editRule({ kind, group: title })}>Add</button></div>
      {sub && <p className="fine">{sub}</p>}
      <ul className="items plan">{rows(list).map((x) => <Row key={x.r.id} {...x} />)}</ul>
    </section>
  );
  return (
    <>
      <p className="intro">This replaces the formulas in the sheet. Everything here feeds the forecast.</p>
      <Section title="Income" list={st.rules.filter((r) => r.kind === "in")} kind="in" sub="Set monthly pay to move off weekends in the item itself." />
      <Section title="Savings" list={st.rules.filter((r) => r.kind === "save")} kind="save" sub="Moved out of the spending account on each date." />
      <section className="card">
        <div className="row-between"><h2>Budgets</h2><button className="link" onClick={() => editRule({ kind: "budget", group: "Budgets" })}>Add</button></div>
        <p className="fine">What you log in the category uses these up.</p>
        <ul className="items plan">
          {M.budgetCheck.map(({ rule: r, actualPer }) => (
            <li key={r.id}>
              <button onClick={() => editRule(r)}>
                <span className="name"><Name>{r.name}</Name><small>{describeRule(r)} · You average {money(actualPer)}</small></span>
                <span>{money(r.amt)}</span>
              </button>
              {actualPer > r.amt * 1.1 && <button className="mini" onClick={() => updRule({ ...r, amt: Math.round(actualPer) })}>Use {money(actualPer)}</button>}
            </li>
          ))}
        </ul>
      </section>
      <section className="card">
        <h2>Everyday spending</h2>
        <p className="fine">What the forecast expects each day. Auto learns from the last {st.settings.weeks} weeks; set your own for things like parking.</p>
        <ul className="items plan">
          {Object.entries(st.daily).map(([cat, cfg]) => (
            <li key={cat}>
              <button onClick={() => editDaily(cat)}>
                <span className="name"><Name>{cat}</Name><small>{cfg.mode === "manual" ? "Amounts you set" : cfg.flat ? "Auto, spread evenly" : "Auto, by day of the week"}</small></span>
                <span>{money(M.rates[cat]?.perWeek || 0)}/wk</span>
              </button>
            </li>
          ))}
        </ul>
      </section>
      {Object.entries(groups).map(([g, list]) => <Section key={g} title={g} list={list} kind="bill" />)}
      <p className="fine center">Regular bills come to about {money(M.billsWk * 52 / 12)} a month.</p>
    </>
  );
}

/* ---------- sheets ---------- */
function LogSheet({ st, M, init, onSave, onDelete, onClose }) {
  const editing = !!init?.id;
  const [t, setT] = useState(init?.t === "fromSav" || init?.t === "in" ? "moneyIn" : init?.t || "spend");
  const [src, setSrc] = useState(init?.t === "in" ? "in" : "fromSav");
  const [c, setC] = useState(init?.c && st.cats.includes(init.c) ? init.c : st.lastCat || st.cats[0]);
  const [a, setA] = useState(init?.a ? String(init.a) : "");
  const [n, setN] = useState(init?.n || "");
  const [d, setD] = useState(init?.d || dnToISO(M.today));
  const amtRef = useRef(null);
  useEffect(() => { setTimeout(() => amtRef.current?.focus(), 60); }, []);
  const notes = (M.topNotes[c] || []).slice(0, 6);
  const type = t === "moneyIn" ? src : t;
  const save = () => {
    const amt = +a;
    if (!amt) return;
    const cat = type === "spend" ? c : type === "fromSav" ? "From savings" : type === "toSav" ? "To savings" : "From someone";
    onSave({ ...(init?.id ? init : {}), id: init?.id || uid(), t: type, c: cat, a: Math.round(amt * 100) / 100, n: n.trim(), d, ts: init?.ts || Date.now(), u: Date.now() });
  };
  return (
    <Sheet title={editing ? "Edit entry" : "Log"} onClose={onClose}>
      <Seg label="Type" value={t} onChange={setT} options={LOG_TYPES} small />
      {t === "moneyIn" && <>
        <p className="lbl">Where did it come from?</p>
        <Seg label="Source" value={src} onChange={setSrc} options={SOURCES} small />
      </>}
      {t === "spend" && <div className="chips" role="radiogroup" aria-label="Category">
        {st.cats.map((x) => <button key={x} role="radio" aria-checked={c === x} className={c === x ? "on" : ""} onClick={() => setC(x)}>{x}</button>)}
      </div>}
      <div className="amt"><span>$</span>
        <input ref={amtRef} aria-label="Amount" inputMode="decimal" placeholder="0.00" value={a} onChange={(e) => setA(clean(e.target.value))} onKeyDown={(e) => e.key === "Enter" && save()} />
      </div>
      <input aria-label="Description" placeholder={type === "spend" ? "What was it?" : type === "in" ? "Who from?" : "Note"} value={n} onChange={(e) => setN(e.target.value)} />
      {t === "spend" && notes.length > 0 && <div className="chips notes">{notes.map((x) => <button key={x.n} className={n === x.n ? "on" : ""} onClick={() => setN(x.n)}>{x.n}</button>)}</div>}
      <label className="datefield">Date<input type="date" value={d} onChange={(e) => setD(e.target.value)} /></label>
      {type === "fromSav" && <p className="fine">Goes into the spending account and comes straight off total savings.</p>}
      {type === "in" && <p className="fine">Goes into the spending account. Savings are untouched.</p>}
      {type === "toSav" && <p className="fine">Comes out of the spending account and adds to savings. Your regular transfer is already in the plan, so only log extras here.</p>}
      <button className="primary wide" disabled={!+a} onClick={save}>{editing ? "Save changes" : `Log ${+a ? money(+a, true) : ""}`}</button>
      {editing && <button className="danger wide" onClick={() => onDelete(init)}>Delete entry</button>}
    </Sheet>
  );
}

function RuleSheet({ st, rule, onSave, onDelete, onClose, today }) {
  const isNew = !rule.id;
  const nextOcc = !isNew ? occurrences(rule, today, today + 800, {})[0] : null;
  const [f, setF] = useState({
    name: rule.name || "", kind: rule.kind || "bill", amt: rule.amt != null ? String(rule.amt) : "", freq: rule.freq || "monthly",
    every: rule.every || 21, start: nextOcc ? dnToISO(nextOcc.dn) : rule.start || dnToISO(today + 1), end: rule.end || "",
    shift: rule.shift || "", cat: rule.cat || st.cats[1], group: rule.group && !["Income", "Savings", "Budgets"].includes(rule.group) ? rule.group : "",
  });
  const set = (k) => (e) => setF({ ...f, [k]: e.target ? e.target.value : e });
  const groups = Array.from(new Set(st.rules.filter((r) => r.kind === "bill").map((r) => r.group).filter(Boolean)));
  const preview = useMemo(() => {
    if (!f.start) return [];
    try { return occurrences({ ...rule, ...f, amt: +f.amt || 0, every: +f.every || 1, end: f.end || undefined, shift: MONTH_STEP[f.freq] ? f.shift : "" }, today, today + 800, {}).slice(0, 4); } catch { return []; }
  }, [f, rule, today]);
  const save = () => {
    if (!f.name.trim() || !+f.amt) return;
    onSave({
      ...rule, id: rule.id || uid(), name: f.name.trim(), kind: f.kind, amt: Math.round(+f.amt * 100) / 100, freq: f.freq,
      every: f.freq === "days" ? Math.max(1, +f.every || 1) : undefined, start: f.start, end: f.end || undefined,
      shift: MONTH_STEP[f.freq] ? f.shift || undefined : undefined, cat: f.kind === "budget" ? f.cat : undefined,
      group: f.kind === "in" ? "Income" : f.kind === "save" ? "Savings" : f.kind === "budget" ? "Budgets" : f.group || "Other bills", active: true,
    });
  };
  return (
    <Sheet title={isNew ? `Add ${KIND_LABEL[f.kind].toLowerCase()}` : rule.name} heading={isNew ? null : <Name>{rule.name}</Name>} onClose={onClose}>
      <div className="form">
        <label>Name<input value={f.name} onChange={set("name")} /></label>
        <Seg label="Type" small wrap value={f.kind} onChange={set("kind")} options={[["in", "Income"], ["bill", "Bill"], ["budget", "Budget"], ["save", "Savings"]]} />
        <div className="form-row">
          <label>Amount<input inputMode="decimal" value={f.amt} onChange={(e) => setF({ ...f, amt: clean(e.target.value) })} /></label>
          <label>How often<select value={f.freq} onChange={set("freq")}>{Object.entries(FREQS).map(([k, v]) => <option key={k} value={k}>{v.replace(" … ", " N ")}</option>)}</select></label>
        </div>
        <label className="datefield">{f.freq === "once" ? "Date" : isNew ? "First date" : "Next date"}<input type="date" value={f.start} onChange={set("start")} /></label>
        {f.freq === "days" && <label>Every <span className="qual">days</span><input inputMode="numeric" value={f.every} onChange={(e) => setF({ ...f, every: clean(e.target.value) })} /></label>}
        {f.freq !== "once" && f.freq !== "days" && <label className="datefield">Ends <span className="qual">optional</span><input type="date" value={f.end} onChange={set("end")} /></label>}
        {MONTH_STEP[f.freq] && <label>If it lands on a weekend
          <select value={f.shift} onChange={set("shift")}><option value="">Keep the date</option><option value="before">Pay the Friday before</option><option value="after">Pay the Monday after</option></select></label>}
        {f.kind === "budget" && <label>Uses spends logged as<select value={f.cat} onChange={set("cat")}>{st.cats.map((c) => <option key={c}>{c}</option>)}</select></label>}
        {f.kind === "bill" && <label>Group<input list="groups" value={f.group} placeholder="Home, Car, Subscriptions" onChange={set("group")} /><datalist id="groups">{groups.map((g) => <option key={g} value={g} />)}</datalist></label>}
        {preview.length > 0 && (
          <div className="preview">
            <small>Next dates</small>
            <div>{preview.map((o) => <span key={o.dn}>{dl(o.dn, { weekday: "short", day: "numeric", month: "short" })}</span>)}</div>
            {MONTH_STEP[f.freq] && !f.shift && preview.some((o) => dowOf(o.dn) > 4) && <small className="warn-txt">One of these lands on a weekend. Set the weekend rule above if it actually comes out on a business day.</small>}
          </div>
        )}
        <button className="primary wide" disabled={!f.name.trim() || !+f.amt} onClick={save}>{isNew ? "Add to plan" : "Save changes"}</button>
        {!isNew && <button className="danger wide" onClick={() => onDelete(rule)}>Delete {rule.name}</button>}
      </div>
    </Sheet>
  );
}

function DailySheet({ st, M, cat, onSave, onClose }) {
  const cfg = st.daily[cat];
  const learned = M.rates[cat]?.hist || Array(7).fill(0);
  const [mode, setMode] = useState(cfg.mode);
  const [dow, setDow] = useState((cfg.dow || learned).map((v) => String(Math.round(v * 100) / 100)));
  return (
    <Sheet title={cat} onClose={onClose}>
      <Seg label="How to estimate" value={mode} onChange={setMode} options={[["auto", "Learn from history"], ["manual", "Set amounts"]]} />
      {mode === "auto" ? (
        <>
          <p className="fine">{cfg.flat ? `Spreads your ${cat} spends under ${money(st.settings.cap)} evenly.` : `Averages what gets logged as ${cat} on each day of the week.`}</p>
          <div className="dow-grid">{DOW.map((d, k) => <div key={d}><small>{d}</small><b>{money(learned[k])}</b></div>)}</div>
        </>
      ) : (
        <>
          <p className="fine">Expected spend for each day of the week. You can still change a single date from Overview or Forecast.</p>
          <div className="dow-grid">
            {DOW.map((d, k) => <label key={d}><small>{d}</small><input inputMode="decimal" value={dow[k]} onChange={(e) => { const v = [...dow]; v[k] = clean(e.target.value); setDow(v); }} /></label>)}
          </div>
          <button className="link" onClick={() => setDow(learned.map((v) => String(Math.round(v * 100) / 100)))}>Fill with what I've actually spent</button>
        </>
      )}
      <button className="primary wide" onClick={() => onSave(cat, mode === "manual" ? { ...cfg, mode, dow: dow.map((v) => +v || 0) } : { ...cfg, mode: "auto" })}>Save</button>
    </Sheet>
  );
}

function OverrideSheet({ o, onSave, onClose }) {
  const [amt, setAmt] = useState(String(Math.round((o.amt || 0) * 100) / 100));
  return (
    <Sheet title={`${o.name}, ${dl(o.dn, { weekday: "short", day: "numeric", month: "short" })}`} heading={<><Name>{o.name}</Name>{`, ${dl(o.dn, { weekday: "short", day: "numeric", month: "short" })}`}</>} onClose={onClose}>
      <p className="fine">{o.daily ? "Change what you expect to spend on this day only." : o.budget ? "Change this budget for this period only." : "Change this payment for this date only. The rest of the schedule stays as it is."}</p>
      <div className="amt"><span>$</span><input inputMode="decimal" aria-label="Amount" value={amt} onChange={(e) => setAmt(clean(e.target.value))} /></div>
      <button className="primary wide" onClick={() => onSave(o.key, { amt: +amt || 0 })}>Save for this day</button>
      <button className="ghost wide" onClick={() => onSave(o.key, { skip: true })}>Skip this one</button>
      {o.overridden && <button className="link" onClick={() => onSave(o.key, null)}>Reset to the usual amount</button>}
    </Sheet>
  );
}

function ReconcileSheet({ M, st, onSave, onClose }) {
  const [sp, setSp] = useState(M.spNow.toFixed(2));
  const [sv, setSv] = useState(M.svNow.toFixed(2));
  return (
    <Sheet title="Update balances" onClose={onClose}>
      <p className="fine">
        Last set on {dl(isoToDn(st.anchor.d), { weekday: "short", day: "numeric", month: "short" })} to {money(st.anchor.spending, true)} and {money(st.anchor.savings, true)}.
        Everything logged since then is already counted, so only change these if the app has drifted from your bank.
      </p>
      <div className="form-row">
        <label>Spending account<input inputMode="decimal" value={sp} onChange={(e) => setSp(clean(e.target.value))} /></label>
        <label>Savings<input inputMode="decimal" value={sv} onChange={(e) => setSv(clean(e.target.value))} /></label>
      </div>
      <p className="fine">Difference: {money(+sp - M.spNow, true)} spending, {money(+sv - M.svNow, true)} savings.</p>
      <button className="primary wide" onClick={() => onSave(+sp || 0, +sv || 0)}>Update balances</button>
    </Sheet>
  );
}

function SettingsSheet({ st, setSettings, storageOk, onShared, onRestore, onCats, onClose }) {
  const [backup, setBackup] = useState("");
  const [restore, setRestore] = useState("");
  const [cat, setCat] = useState("");
  const [err, setErr] = useState("");
  const S = st.settings;
  return (
    <Sheet title="Settings" onClose={onClose}>
      <div className="set"><label htmlFor="buf">Buffer to keep in the account</label>
        <input id="buf" inputMode="numeric" value={S.buffer} onChange={(e) => setSettings({ buffer: +clean(e.target.value) || 0 })} /></div>
      <div className="set"><label htmlFor="cap">Treat one-off spends over this as unusual</label>
        <input id="cap" inputMode="numeric" value={S.cap} onChange={(e) => setSettings({ cap: +clean(e.target.value) || 0 })} /></div>
      <div className="set"><label htmlFor="wk">Learn spending from the last</label>
        <Seg label="Lookback" small value={S.weeks} onChange={(v) => setSettings({ weeks: v })} options={[[4, "4 weeks"], [8, "8 weeks"], [12, "12 weeks"]]} /></div>

      <h3>Categories</h3>
      <div className="chips">{st.cats.map((c) => <button key={c} className="on" onClick={() => onCats(st.cats.filter((x) => x !== c))}>{c} ×</button>)}</div>
      <div className="form-row">
        <input placeholder="Add a category" value={cat} onChange={(e) => setCat(e.target.value)} />
        <button className="ghost" disabled={!cat.trim()} onClick={() => { onCats([...st.cats, cat.trim()]); setCat(""); }}>Add</button>
      </div>

      <h3>Logging from two phones</h3>
      <div className="set tg"><span>Share with anyone who has this link</span><Toggle label="Shared mode" on={!!S.shared} onChange={onShared} /></div>
      <p className="fine">Turn this on so both your entries land in the same place. Balances and notes are then visible to anyone who opens the link.</p>

      <h3>Backup</h3>
      <p className="fine">{storageOk ? "Entries save as you go. Take a backup before switching to a new version of the app." : "Storage isn't working here, so nothing will be kept. Copy a backup before you close this."}</p>
      <button className="ghost wide" onClick={() => setBackup(JSON.stringify(st))}>Create backup</button>
      {backup && <textarea readOnly value={backup} onFocus={(e) => e.target.select()} aria-label="Backup text, copy it somewhere safe" />}
      <textarea placeholder="Paste a backup here to restore it" value={restore} onChange={(e) => setRestore(e.target.value)} aria-label="Paste backup" />
      <button className="ghost wide" disabled={!restore.trim()} onClick={() => {
        try { const s = JSON.parse(restore); if (!s.logs || !s.rules || !s.anchor) throw 0; onRestore(s); } catch { setErr("That doesn't look like a backup from this app."); }
      }}>Restore backup</button>
      {err && <p className="err">{err}</p>}
    </Sheet>
  );
}

/* ---------- App ---------- */
export default function MoneyApp() {
  const [st, setSt] = useState(null);
  const [tab, setTab] = useState("overview");
  const [sel, setSel] = useState(null);
  const [SC, setSC] = useState({ cut: 0, adds: [], skips: {} });
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState(null);
  const [storageOk, setStorageOk] = useState(true);
  const saveTimer = useRef(null);
  const loaded = useRef(false);
  const rootRef = useRef(null);

  // every tab opens at the top, whatever the last one was scrolled to
  useEffect(() => {
    const jump = () => {
      try { window.scrollTo(0, 0); } catch { /* ignore */ }
      if (document.scrollingElement) document.scrollingElement.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      let p = rootRef.current?.parentElement;
      while (p) { if (p.scrollTop) p.scrollTop = 0; p = p.parentElement; }
    };
    jump();
    const id = requestAnimationFrame(jump);
    return () => cancelAnimationFrame(id);
  }, [tab]);

  // keep the layout fixed: no pinch or focus zoom inside the app
  useEffect(() => {
    try {
      const content = "width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, viewport-fit=cover";
      let m = document.querySelector('meta[name="viewport"]');
      if (!m) { m = document.createElement("meta"); m.name = "viewport"; document.head.appendChild(m); }
      m.setAttribute("content", content);
      const stop = (e) => e.touches?.length > 1 && e.preventDefault();
      document.addEventListener("touchmove", stop, { passive: false });
      document.addEventListener("gesturestart", stop);
      return () => { document.removeEventListener("touchmove", stop); document.removeEventListener("gesturestart", stop); };
    } catch { /* nothing to do */ }
  }, []);

  useEffect(() => {
    (async () => {
      let s = migrate(await sGet(STORE_KEY, false));
      if (s?.settings?.shared) s = mergeStates(s, migrate(await sGet(SHARED_KEY, true)));
      const init = s || { ...SEED, anchor: { ...SEED.anchor, ts: Date.now() } };
      setSt(init);
      setStorageOk(await sSet(STORE_KEY, init, false));
      loaded.current = true;
    })();
  }, []);

  const persist = useCallback((s) => {
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      let out = s;
      if (s.settings.shared) {
        const remote = migrate(await sGet(SHARED_KEY, true));
        out = mergeStates(s, remote);
        await sSet(SHARED_KEY, out, true);
        if (out.logs.length !== s.logs.length) setSt(out);
      }
      setStorageOk(await sSet(STORE_KEY, out, false));
    }, 350);
  }, []);
  useEffect(() => { if (loaded.current && st) persist(st); }, [st, persist]);

  useEffect(() => {
    if (!st?.settings.shared) return;
    const pull = async () => {
      const remote = migrate(await sGet(SHARED_KEY, true));
      if (remote && remote.updated > (st.updated || 0)) setSt((cur) => mergeStates(cur, remote));
    };
    const id = setInterval(pull, 20000);
    const vis = () => document.visibilityState === "visible" && pull();
    document.addEventListener("visibilitychange", vis);
    return () => { clearInterval(id); document.removeEventListener("visibilitychange", vis); };
  }, [st?.settings.shared, st?.updated]);

  const M = useMemo(() => (st ? buildModel(st, SC) : null), [st, SC]);
  useEffect(() => { if (M && (sel === null || sel < M.today)) setSel(M.today); }, [M, sel]);
  if (!st || !M || sel === null) return <div className="app"><style>{CSS}</style><p className="fine center">Loading…</p></div>;

  const up = (fn, cfg = false) => setSt((s) => ({ ...fn(s), updated: Date.now(), ...(cfg ? { cfgUpdated: Date.now() } : {}) }));
  const flash = (msg, undo) => { setToast({ msg, undo, id: Date.now() }); setTimeout(() => setToast((t) => (t && Date.now() - t.id > 3800 ? null : t)), 4000); };

  const saveLog = (l) => {
    const existed = st.logs.some((x) => x.id === l.id);
    up((s) => ({ ...s, lastCat: l.t === "spend" ? l.c : s.lastCat, logs: existed ? s.logs.map((x) => (x.id === l.id ? l : x)) : [...s.logs, l] }));
    setModal(null);
    flash(existed ? "Saved" : `Logged ${money(l.a, true)}${l.n ? ` ${l.n.toLowerCase()}` : ""}`, existed ? null : () => up((s) => ({ ...s, logs: s.logs.filter((x) => x.id !== l.id), deleted: [...(s.deleted || []), l.id] })));
  };
  const deleteLog = (l) => {
    up((s) => ({ ...s, logs: s.logs.filter((x) => x.id !== l.id), deleted: [...(s.deleted || []), l.id] }));
    setModal(null);
    flash("Entry deleted", () => up((s) => ({ ...s, logs: [...s.logs, l], deleted: (s.deleted || []).filter((x) => x !== l.id) })));
  };
  const saveRule = (r) => { up((s) => ({ ...s, rules: s.rules.some((x) => x.id === r.id) ? s.rules.map((x) => (x.id === r.id ? r : x)) : [...s.rules, r] }), true); setModal(null); flash(`${r.name} saved`); };
  const deleteRule = (r) => { up((s) => ({ ...s, rules: s.rules.filter((x) => x.id !== r.id) }), true); setModal(null); flash(`${r.name} removed`, () => up((s) => ({ ...s, rules: [...s.rules, r] }), true)); };
  const saveOverride = (key, v) => { up((s) => { const o = { ...s.overrides }; if (v) o[key] = v; else delete o[key]; return { ...s, overrides: o }; }, true); setModal(null); };
  const setSettings = (p) => up((s) => ({ ...s, settings: { ...s.settings, ...p } }), true);
  const setAnchor = (spending, savings) => { up((s) => ({ ...s, anchor: { d: dnToISO(M.today), ts: Date.now(), spending, savings, confirmed: true } }), true); setModal(null); flash("Balances saved"); };
  const onShared = async (on) => {
    if (on) { const remote = migrate(await sGet(SHARED_KEY, true)); const merged = mergeStates({ ...st, settings: { ...st.settings, shared: true } }, remote); setSt({ ...merged, settings: { ...merged.settings, shared: true }, cfgUpdated: Date.now() }); }
    else setSettings({ shared: false });
  };
  const addToPlan = (a) => saveRule({ id: uid(), name: a.name, kind: "bill", amt: a.amt, freq: "once", start: a.d, group: "Planned", active: true });
  const openLog = (init) => setModal({ type: "log", init });
  const openOverride = (o) => o.key && setModal({ type: "override", o });

  return (
    <div className="app" ref={rootRef}>
      <style>{CSS}</style>
      <header className="top">
        <div><h1>Money</h1><p>{dl(M.today, { weekday: "long", day: "numeric", month: "long" })}{st.settings.shared ? ", shared" : ""}</p></div>
        <button className="icon" aria-label="Settings" onClick={() => setModal({ type: "settings" })}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="M4 7h10M18 7h2M4 17h4M12 17h8" /><circle cx="16" cy="7" r="2" /><circle cx="10" cy="17" r="2" /></svg>
        </button>
      </header>
      {!storageOk && <div className="note warn">Changes can't be saved in this view. Open the published app, or copy a backup from settings before closing.</div>}

      <main>
        {tab === "overview" && <Overview st={st} M={M} sel={sel} setSel={setSel} openLog={openLog} openOverride={openOverride} go={setTab} openReconcile={() => setModal({ type: "reconcile" })} confirmAnchor={setAnchor} />}
        {tab === "forecast" && <Forecast st={st} M={M} setSettings={setSettings} SC={SC} setSC={setSC} openLog={openLog} addToPlan={addToPlan} openOverride={openOverride} />}
        {tab === "log" && <LogTab st={st} M={M} openLog={openLog} openOverride={openOverride} go={setTab} />}
        {tab === "plan" && <Plan st={st} M={M} editRule={(r) => setModal({ type: "rule", r })} editDaily={(cat) => setModal({ type: "daily", cat })} updRule={saveRule} />}
      </main>

      <nav className="navbar" role="tablist" aria-label="Sections">
        {NAV.map(([k, label, d]) => (
          <button key={k} role="tab" aria-selected={tab === k} aria-label={label} className={tab === k ? "on" : ""} onClick={() => setTab(k)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>
          </button>
        ))}
        <button className="nav-add" onClick={() => openLog(null)} aria-label="Log a spend or transfer">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
        </button>
      </nav>

      {toast && <div className="toast" role="status"><span>{toast.msg}</span>{toast.undo && <button onClick={() => { toast.undo(); setToast(null); }}>Undo</button>}</div>}

      {modal?.type === "log" && <LogSheet st={st} M={M} init={modal.init} onSave={saveLog} onDelete={deleteLog} onClose={() => setModal(null)} />}
      {modal?.type === "rule" && <RuleSheet st={st} rule={modal.r} today={M.today} onSave={saveRule} onDelete={deleteRule} onClose={() => setModal(null)} />}
      {modal?.type === "daily" && <DailySheet st={st} M={M} cat={modal.cat} onSave={(cat, cfg) => { up((s) => ({ ...s, daily: { ...s.daily, [cat]: cfg } }), true); setModal(null); }} onClose={() => setModal(null)} />}
      {modal?.type === "override" && <OverrideSheet o={modal.o} onSave={saveOverride} onClose={() => setModal(null)} />}
      {modal?.type === "reconcile" && <ReconcileSheet M={M} st={st} onSave={setAnchor} onClose={() => setModal(null)} />}
      {modal?.type === "settings" && <SettingsSheet st={st} setSettings={setSettings} storageOk={storageOk} onShared={onShared} onCats={(cats) => up((s) => ({ ...s, cats }), true)} onRestore={(s) => { setSt({ ...migrate(s), updated: Date.now(), cfgUpdated: Date.now() }); setModal(null); flash("Backup restored"); }} onClose={() => setModal(null)} />}
    </div>
  );
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
.app{--bg:#030516;--card:#0B0E1E;--card2:#131832;--ink:#FFFFFF;--muted:#8C93AD;--line:rgba(255,255,255,.09);
  --blue:#0EB2FF;--yellow:#F5D04E;--pos:#3ED9A4;--neg:#FF6B8B;
  font-family:'Outfit',ui-sans-serif,system-ui,-apple-system,'Segoe UI',sans-serif;font-optical-sizing:auto;background:var(--bg);color:var(--ink);
  min-height:100vh;max-width:460px;margin:0 auto;padding:18px 16px 118px;font-size:15px;line-height:1.5;font-variant-numeric:tabular-nums;box-sizing:border-box;
  overflow-x:hidden;touch-action:manipulation;-webkit-text-size-adjust:100%;text-size-adjust:100%}
.app *{box-sizing:border-box;min-width:0;max-width:100%;touch-action:manipulation}
.app ul,.app li{overflow-wrap:anywhere}
:where(.app) button{font:inherit;color:inherit;cursor:pointer;border:0;background:none;padding:0;text-align:inherit}
.app button:focus-visible,.app input:focus-visible,.app select:focus-visible{outline:2px solid var(--blue);outline-offset:2px}
.app button:disabled{opacity:.35;cursor:default}

.top{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px}
.top h1{font-size:21px;font-weight:700;letter-spacing:-.02em;margin:0}
.top p{margin:0;color:var(--muted);font-size:12.5px}
.icon{width:42px;height:42px;border-radius:50%;background:var(--card2)!important;display:grid!important;place-items:center;color:#fff;border:1px solid var(--line)}
main{display:flex;flex-direction:column;gap:12px}

.hero{border-radius:28px;padding:20px;color:#fff;position:relative;overflow:hidden;
  background:radial-gradient(130% 100% at 85% 0%,#31C8FF 0%,rgba(49,200,255,0) 55%),linear-gradient(150deg,#0EA6F5 0%,#0B57C9 48%,#071B5E 100%);
  box-shadow:0 20px 40px -22px rgba(14,178,255,.75)}
.hero-top{display:flex;justify-content:space-between;align-items:center;font-size:13.5px;opacity:.92;gap:10px}
.pill{background:#031B3A;color:#fff;border:1px solid rgba(255,255,255,.35);padding:5px 14px;border-radius:999px;font-size:12px;font-weight:600;white-space:nowrap;letter-spacing:.01em;box-shadow:0 2px 10px rgba(3,10,30,.45)}
.hero-amt{font-size:clamp(32px,10.5vw,44px);font-weight:700;letter-spacing:-.04em;line-height:1.1;margin:6px 0 12px;white-space:nowrap}
.hero-amt.short{color:#FFD9E2}
.hero-legend{display:flex;gap:16px;flex-wrap:wrap;font-size:12.5px;opacity:.95}
.hero-legend i{display:inline-block;width:7px;height:7px;border-radius:50%;margin-right:7px;vertical-align:middle}
.hero-legend i.d1{background:var(--yellow)}
.hero-legend i.d2{background:#fff}
.hero-btn{margin-top:16px;background:rgba(255,255,255,.14)!important;border:1px solid rgba(255,255,255,.2);border-radius:999px;padding:8px 16px!important;font-size:13px;font-weight:600}

.card{background:var(--card);border:1px solid var(--line);border-radius:24px;padding:16px}
.card h2{font-size:15.5px;font-weight:600;margin:0 0 8px;letter-spacing:-.01em}
.card h2.sub{margin:18px 0 0;font-size:14px}
.qual{font-size:.78em;font-weight:100;letter-spacing:.02em;opacity:.92}
.card p{margin:6px 0 0;font-size:13.5px;color:#C3C8DA}
.lead{font-size:14px}
.fine{font-size:12.5px!important;color:var(--muted)!important;margin:8px 0 0}
.lbl{font-size:12.5px!important;color:var(--muted)!important;margin:14px 0 -4px}
.center{text-align:center}
.intro{margin:0 4px;color:var(--muted);font-size:13px}
.row-between{display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap}
.row-between h2{margin:0}
.right{text-align:right}
.link{color:var(--blue)!important;font-weight:600;font-size:13.5px;margin-top:8px;display:inline-block}
.neg{color:var(--neg)!important}.pos{color:var(--pos)!important}.muted{color:var(--muted)}

.bottom small{display:block;font-size:12px;color:var(--muted)}
.bottom b{font-size:15.5px;font-weight:600}
.bottom .right b{font-size:clamp(17px,5.4vw,21px);font-weight:700;white-space:nowrap}
.runway{width:100%;height:70px;display:block;margin:12px 0 4px;cursor:pointer}
.rw-axis{display:flex;font-size:11px;color:var(--muted);margin-bottom:2px}
.rw-axis span{flex:1;text-align:center;white-space:nowrap}
.rw-axis .first{text-align:left}.rw-axis .last{text-align:right}

.stepper{display:flex;align-items:center;justify-content:space-between;gap:10px}
.stepper>div{text-align:center;flex:1;min-width:0}
.stepper b{display:block;font-size:15.5px;font-weight:600}
.stepper small{font-size:12.5px;color:var(--muted)}
.stepper button{width:38px;height:38px;border-radius:50%;background:var(--card2)!important;border:1px solid var(--line);font-size:19px;text-align:center!important;color:#fff;flex-shrink:0}
.day-sum{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:14px 0 4px}
.day-sum>div{background:var(--card2);border-radius:16px;padding:10px}
.day-sum small{display:block;font-size:11px;color:var(--muted)}
.day-sum b{font-size:clamp(13px,3.8vw,15px);font-weight:600;white-space:nowrap}

.items{list-style:none;margin:6px 0 0;padding:0}
.items li{display:flex;align-items:center;gap:8px;border-bottom:1px solid var(--line);font-size:14px}
.items li:last-child{border-bottom:0}
.items li>button:first-child{display:flex;align-items:center;gap:11px;width:100%;flex:1;min-width:0;padding:11px 0!important}
.items .name{flex:1 1 auto;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:500}
.items .name small{display:block;color:var(--muted);font-size:11.5px;font-weight:400;overflow:hidden;text-overflow:ellipsis}
.items li span:last-child{font-weight:600;flex-shrink:0;white-space:nowrap}
.dot{width:30px;height:30px;border-radius:50%;flex-shrink:0;background:var(--card2);border:1px solid var(--line);position:relative}
.dot:after{content:"";position:absolute;inset:0;margin:auto;width:8px;height:8px;border-radius:50%;background:var(--muted)}
.dot.in:after{background:var(--pos)}
.dot.save:after{background:var(--blue)}
.dot.budget:after{background:var(--yellow)}
.dot.log:after{background:#7C6BFF}
.dot.whatif:after{background:var(--neg)}
.dot.est{background:transparent}
.dot.est:after{width:7px;height:7px;background:transparent;border:1.5px solid var(--muted)}

.group{margin-top:14px}
.group:first-child{margin-top:0}
.group-head{font-size:12px;font-weight:600;color:var(--muted);border-bottom:1px solid var(--line);padding-bottom:5px;gap:8px}
.group-head span:last-child{white-space:nowrap}
.events{list-style:none;margin:6px 0 0;padding:0}
.events li{display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid var(--line);font-size:14px}
.events li:last-child{border-bottom:0}
.events li>button:first-child:not(.mini){display:flex;align-items:center;gap:10px;width:100%;flex:1;min-width:0}
.events .date{width:52px;color:var(--muted);font-size:12.5px;flex-shrink:0}
.events .name{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:500}
.events .name small{display:block;color:var(--muted);font-size:11.5px;font-weight:400;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.events .name.wrap2{white-space:normal}
.events .name.wrap2 small{white-space:normal;line-height:1.35}
.events li>span:last-child{font-weight:600;flex-shrink:0;white-space:nowrap}
.mini{font-size:12px;font-weight:600;background:rgba(14,178,255,.14)!important;color:var(--blue)!important;padding:5px 10px!important;border-radius:999px;white-space:nowrap;flex-shrink:0}

.bars{list-style:none;margin:10px 0 0;padding:0;display:flex;flex-direction:column;gap:11px}
.bars li{font-size:13.5px}
.bars .row-between span:last-child{white-space:nowrap;font-weight:600}
.bar{height:6px;background:rgba(255,255,255,.08);border-radius:4px;margin-top:6px;overflow:hidden}
.bar span{display:block;height:100%;border-radius:4px}
.wk{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-top:14px}
.wk>div{background:var(--card2);border-radius:14px;padding:9px 6px;text-align:center}
.wk small{display:block;font-size:10.5px;color:var(--muted)}
.wk b{font-size:clamp(12px,3.5vw,14px);font-weight:600;white-space:nowrap}

.seg{display:flex;background:var(--card2);border-radius:999px;padding:4px;overflow-x:auto;scrollbar-width:none;border:1px solid var(--line)}
.seg::-webkit-scrollbar{display:none}
.seg.wrap{display:grid;grid-template-columns:1fr 1fr;gap:4px;border-radius:18px;overflow:visible}
.seg.wrap button{border-radius:14px;flex:none}
.seg button{padding:7px 10px;border-radius:999px;font-size:13px;font-weight:600;color:var(--muted);flex:1 0 auto;text-align:center;white-space:nowrap}
.seg.sm button{padding:5px 11px;font-size:12.5px}
.seg button.on{background:var(--blue);color:#04121F}

.chart{margin-top:12px;margin-left:-4px}
.chart-wrap{position:relative}
.chart-wrap svg{width:100%;display:block;touch-action:pan-y}
.legend{display:flex;gap:14px;font-size:11.5px;color:var(--muted);margin-top:2px;flex-wrap:wrap}
.legend i{display:inline-block;width:12px;height:3px;border-radius:2px;margin-right:6px;vertical-align:middle}
.legend i.dash{background:repeating-linear-gradient(90deg,rgba(255,255,255,.5) 0 2px,transparent 2px 5px)}
.tip{position:absolute;top:2px;background:#fff;color:#05101F;padding:7px 10px;border-radius:12px;font-size:11.5px;font-weight:600;box-shadow:0 8px 20px -8px rgba(0,0,0,.6);pointer-events:none;white-space:nowrap}
.tip b{display:block;font-size:12px;margin-bottom:2px}
.tip span{display:block;font-weight:500;color:#3C4560}
.kpis{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:14px}
.kpis>div{background:var(--card2);border-radius:16px;padding:11px}
.kpis small{display:block;font-size:11px;color:var(--muted)}
.kpis b{font-size:clamp(13px,4vw,15.5px);font-weight:700;white-space:nowrap}
.kpis em{display:block;font-style:normal;font-size:11px;color:var(--muted)}
.vs{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:8px;background:var(--card2);border-radius:18px;padding:13px;margin-top:12px}
.vs small{display:block;font-size:11.5px;color:var(--muted)}
.vs b{font-size:19px;font-weight:700;letter-spacing:-.02em}
.vs em{display:block;font-style:normal;font-size:11.5px;color:var(--muted)}
.vs .bad b{color:var(--neg)}.vs .good b{color:var(--pos)}
.arrow{font-size:24px;color:var(--muted)}

.week{padding:4px 16px}
.week-head{width:100%;display:flex!important;align-items:center;gap:10px;padding:13px 0!important;font-weight:600;font-size:14px}
.week-head span:first-child{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.week-head .muted,.week-head .neg{font-size:13px;font-weight:600}
.caret{width:8px;height:8px;border-right:2px solid var(--muted);border-bottom:2px solid var(--muted);transform:rotate(45deg);margin:-4px 4px 0}
.caret.up{transform:rotate(-135deg);margin-top:4px}
.days{list-style:none;margin:0 0 8px;padding:0}
.days li{display:grid;grid-template-columns:38px 1fr auto;gap:10px;align-items:start;padding:10px 0;border-top:1px solid var(--line)}
.d-date b{display:block;font-size:12px;color:var(--muted);font-weight:500}
.d-date span{font-size:16px;font-weight:700}
.d-chips{display:flex;flex-wrap:wrap;gap:4px;min-width:0}
.c{font-size:11.5px!important;padding:3px 9px!important;border-radius:999px;background:var(--card2)!important;color:#C3C8DA;border:1px solid var(--line)}
.c.in{background:rgba(62,217,164,.12)!important;color:var(--pos);border-color:transparent}
.c.save{background:rgba(14,178,255,.14)!important;color:var(--blue);border-color:transparent}
.c.budget{background:rgba(245,208,78,.14)!important;color:var(--yellow);border-color:transparent}
.c.log{background:rgba(124,107,255,.16)!important;color:#A99BFF;border-color:transparent}
.c.whatif{background:rgba(255,107,139,.14)!important;color:var(--neg);border-color:transparent}
.c.est{background:transparent!important;border:1px dashed rgba(255,255,255,.22)!important;color:var(--muted)}
.d-bal{text-align:right}
.d-bal b{display:block;font-size:14px}
.d-bal small{font-size:11px;color:var(--muted)}
.days li.low .d-bal b{color:var(--neg)}

.form{display:flex;flex-direction:column;gap:10px}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:8px;align-items:end}
.form-row>*{min-width:0}
.form label,.form-row label,label.inline{display:flex;flex-direction:column;gap:5px;font-size:12.5px;font-weight:500;color:var(--muted)}
label.inline{flex-direction:row;align-items:center;gap:10px;margin:12px 0}
label.inline input{flex:1}
.app input:not([type=range]),.app select,.app textarea{font:inherit;font-size:16px!important;max-width:100%;padding:12px 14px;border-radius:14px;border:1px solid var(--line);background:var(--card2);color:var(--ink);width:100%}
.app input::placeholder,.app textarea::placeholder{color:#666E8A}
.app textarea{min-height:76px;font-size:16px;margin-top:8px;resize:vertical}
.app input[type=range]{width:100%;accent-color:var(--blue);margin:8px 0 0;background:none;border:0;padding:0}
.app input[type=date]{color-scheme:dark;-webkit-appearance:none;appearance:none;display:block;width:100%;min-width:0;max-width:100%;text-align:left}
.app input[type=date]::-webkit-date-and-time-value{text-align:left;margin:0;min-width:0;max-width:100%}
.app input[type=date]::-webkit-datetime-edit{padding:0;min-width:0;overflow:hidden}
.app input[type=date]::-webkit-calendar-picker-indicator{margin:0 0 0 auto;padding:0;opacity:.55;filter:invert(1)}
.datefield{display:flex!important;flex-direction:column;gap:5px;font-size:12.5px;font-weight:500;color:var(--muted);width:100%;margin-top:2px}
.preview{background:var(--card2);border-radius:16px;padding:12px}
.preview>small{font-size:11.5px;color:var(--muted);font-weight:600}
.preview>div{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}
.preview span{font-size:12.5px;background:rgba(255,255,255,.07);border-radius:999px;padding:4px 10px}
.warn-txt{display:block;margin-top:8px;font-size:11.5px;color:var(--neg)}

.primary{background:var(--blue)!important;color:#04121F!important;padding:14px 16px!important;border-radius:16px;font-weight:700;text-align:center!important;white-space:nowrap}
.ghost{padding:12px 14px!important;border-radius:16px;font-weight:600;color:#fff!important;background:var(--card2)!important;border:1px solid var(--line);text-align:center!important}
.danger{padding:12px 14px!important;border-radius:16px;font-weight:600;color:var(--neg)!important;background:rgba(255,107,139,.1)!important;text-align:center!important}
.wide{width:100%;display:block;margin-top:10px}
.x{width:32px;height:32px;border-radius:50%;background:var(--card2)!important;font-size:17px;line-height:1;color:var(--muted);text-align:center!important;flex-shrink:0;border:1px solid var(--line)}
.tog{width:44px;height:26px;border-radius:13px;background:rgba(255,255,255,.14)!important;position:relative;flex-shrink:0;transition:background .15s}
.tog span{position:absolute;top:3px;left:3px;width:20px;height:20px;border-radius:50%;background:#fff;transition:left .15s}
.tog.on{background:var(--blue)!important}.tog.on span{left:21px}
.note{border-radius:16px;padding:11px 13px;font-size:13px;margin-bottom:12px}
.note.warn{background:rgba(255,107,139,.12);color:#FFB3C4}
.onboard{border:1px solid rgba(14,178,255,.4)}
.onboard .form-row{margin-top:12px}

.navbar{position:fixed;bottom:18px;left:50%;transform:translateX(-50%);display:flex;align-items:center;gap:6px;
  background:rgba(19,24,50,.94);border:1px solid var(--line);border-radius:999px;padding:7px;z-index:10;
  box-shadow:0 16px 34px -14px rgba(0,0,0,.85);backdrop-filter:blur(14px)}
.navbar button{width:46px;height:46px;border-radius:50%;display:grid!important;place-items:center;color:var(--muted)}
.navbar button svg{width:21px;height:21px}
.navbar button.on{background:#fff!important;color:#05101F}
.nav-add{background:var(--blue)!important;color:#04121F!important}

.toast{position:fixed;bottom:92px;left:50%;transform:translateX(-50%);background:#fff;color:#05101F;border-radius:16px;padding:11px 15px;display:flex;gap:16px;align-items:center;font-size:14px;font-weight:600;z-index:11;box-shadow:0 12px 26px -10px rgba(0,0,0,.7);max-width:92%}
.toast button{color:#0B72B5!important;font-weight:700}
.sheet-bg{position:fixed;inset:0;background:rgba(3,5,22,.72);display:flex;align-items:flex-end;justify-content:center;z-index:20;backdrop-filter:blur(3px)}
.sheet{background:#0B0E1E;border:1px solid var(--line);border-bottom:0;width:100%;max-width:460px;border-radius:28px 28px 0 0;padding:18px 18px 30px;max-height:90vh;overflow:auto;overflow-x:hidden}
.sheet-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:14px}
.sheet h2{font-size:18px;margin:0;font-weight:600}
.sheet h3{font-size:13.5px;margin:22px 0 4px;color:var(--muted);font-weight:600}
.sheet>input,.sheet>.form-row{margin-top:10px}
.chips{display:flex;flex-wrap:wrap;gap:6px;margin-top:12px}
.chips button{padding:8px 13px!important;border-radius:999px;background:var(--card2)!important;font-size:13.5px;font-weight:500;color:#C3C8DA;border:1px solid var(--line)}
.chips button.on{background:var(--blue)!important;color:#04121F;border-color:transparent;font-weight:700}
.chips.notes button{font-size:12.5px;padding:6px 11px!important}
.amt{display:flex;align-items:center;gap:6px;margin-top:16px;border-bottom:1px solid var(--line);padding-bottom:6px}
.amt span{font-size:clamp(24px,8vw,30px);font-weight:600;color:var(--muted);flex-shrink:0}
.app .amt input{font-size:clamp(26px,9vw,34px)!important;font-weight:700;border:0!important;background:none!important;padding:4px 0!important;border-radius:0}
.dow-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:5px;margin:14px 0 4px}
.dow-grid>div,.dow-grid label{display:flex;flex-direction:column;align-items:center;gap:4px;background:var(--card2);border-radius:14px;padding:9px 2px}
.dow-grid small{font-size:11px;color:var(--muted);font-weight:600}
.dow-grid b{font-size:12.5px}
.app .dow-grid input{padding:6px 2px!important;font-size:16px!important;text-align:center;border-radius:10px}
.set{display:flex;flex-direction:column;gap:7px;margin-top:16px}
.set label,.set span{font-size:13.5px;font-weight:500}
.set.tg{flex-direction:row;justify-content:space-between;align-items:center}
.err{color:var(--neg)!important;font-size:13px}
@media (prefers-reduced-motion:reduce){.tog,.tog span{transition:none}}
`;
