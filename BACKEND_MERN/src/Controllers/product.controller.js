import Product from "../model/product.schema.js";


export const productTranscationController = async (req, res) => {

    const { search, page = 1, perPage = 10, month } = req.query;

    const searchQuery = search
        ? {
            $or: [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { price: Number(search) || 0 },
            ],
        }
        : {};


    let monthQuery = {};
    if (month) {
        const monthNumber = new Date(`${month} 1, 1970`).getMonth() + 1;
        monthQuery = {
            $expr: {
                $eq: [{ $month: '$dateOfSale' }, monthNumber],
            },
        };
    }

    const query = { ...searchQuery, ...monthQuery };

    try {

        const totalDocuments = await Product.countDocuments(query); // Step 1

        const productTranscation = await Product.find(query)
            .skip((page - 1) * perPage)
            .limit(Number(perPage));


        const totalPages = Math.ceil(totalDocuments / perPage);

        res.json({
            products: productTranscation,
            totalPages: totalPages,

        });
    } catch (error) {

        console.log("error is ", error);

        res.status(500).json({ error: 'Server Error' });
    }

}

export const stataticsController = async (req, res) => {

    const { month } = req.query

    console.log("secrch is ", month);


    if (!month) {
        return res.status(400).json({ error: 'Month is required' });
    }

    try {

        const monthNumber = new Date(`${month} 1, 1970`).getMonth() + 1;

        const soldProduct = await Product.find({
            $expr: {
                $eq: [{ $month: '$dateOfSale' }, monthNumber],
            },
            sold: true
        });


        const soldProductLength = soldProduct.length

        const totalSaleAmount = soldProduct.reduce((total, product) => total + product.price, 0)

        const unSoldProducts = await Product.find({
            $expr: {
                $eq: [{ $month: '$dateOfSale' }, monthNumber],
            },
            sold: false
        });

        const unSoldProductsLength = unSoldProducts.length

        const response = {
            totalSaleAmount,
            soldProductLength,
            unSoldProductsLength,
        };

        res.json(response);

    } catch (error) {
        console.log("error is ", error);

        res.status(500).json({ error: 'Server Error' });
    }

}

export const barChartController = async (req, res) => {

    const { month } = req.query

    console.log("secrch is ", month);


    if (!month) {
        return res.status(400).json({ error: 'Month is required' });
    }

    try {

        const monthNumber = new Date(`${month} 1, 1970`).getMonth() + 1;

        const products = await Product.find({
            $expr: {
                $eq: [{ $month: '$dateOfSale' }, monthNumber],
            }

        });

        const ranges = [
            { min: 0, max: 100 },
            { min: 101, max: 200 },
            { min: 201, max: 300 },
            { min: 301, max: 400 },
            { min: 401, max: 500 },
            { min: 501, max: 600 },
            { min: 601, max: 700 },
            { min: 701, max: 800 },
            { min: 801, max: 900 },
            { min: 901, max: Infinity },
        ];

        const counts = ranges.map(range => ({ range: `${range.min} - ${range.max}`, count: 0 }));

        // console.log("counts ", counts);


        // console.log("product ", products);


        products.forEach(product => {

            let ind = 0;
            for (const range of counts) {

                if (product.price >= ranges[ind].min && product.price <= ranges[ind].max) {
                    range.count += 1;
                    break;
                }
                ind++;
            }
        });

        res.json(counts);

    }
    catch (error) {

        console.log("error is ", error);
        res.status(500).json({ error: 'Server Error' });

    }
}

export const pieChartController = async (req, res) => {

    const { month } = req.query;

    if (!month) {
        return res.status(400).json({ error: 'Month is required' });
    }

    try {

        const monthNumber = new Date(`${month} 1, 1970`).getMonth() + 1;

        const result = await Product.aggregate([

            {
                $match: {
                    $expr: {

                        $eq: [{ $month: '$dateOfSale' }, monthNumber],
                    },

                },
            },

            {
                $group: {
                    _id: "$category",
                    count: { $sum: 1 },
                },
            },
            {
                $project: {
                    _id: 0,
                    category: "$_id",
                    count: 1,
                },
            },
        ]);


        res.json(result);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Server Error' });
    }


}