require("dotenv").config()

const cors = require("cors")
const Stripe = require("stripe")
const PORT = 8080
const express = require("express")
const app = express()
const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

app.use("/stripe", express.raw({ type: "*/*" }));
app.use(express.json())
app.use(cors())


app.post("/pay",async(req,res)=>{
    try{
    const {name,amount} = req.body
    const payment = await stripe.paymentIntents.create({
        amount: Math.round(amount*100),
        currency: "GBP",
        payment_method_types:["card"],
        metadata:{name,amount}
    })
    const clientSecret = payment.client_secret
    res.json({message:`payment has been initialised`, clientSecret})
    }
    catch(err){
        console.error(err)
        res.status(500).json({message:"server error"})
    }
})


app.post('/stripe',async(req,res)=>{
    let action;
    const signature = req.headers['stripe-signature'];

    try{
        action = await stripe.webhooks.constructEvent(req.body,signature,process.env.WEBHOOKS_SECRET_KEY)
    }catch(err){
        console.error(err)
        res.status(400).json({meassage:err.message})
    }
    if (action.type === "payment_intent.created") {
        console.log(`${action.data.object.metadata.name} PAYMENT HAS BEEN INITIATED!`);
      }
    
      if (action.type === "payment_intent.succeeded") {
        console.log(`${action.data.object.metadata.name} PAYMENT COMPLETED SUCCESSFULLY!`);
      }
      res.json({ ok: true });     
    });




app.listen(PORT,()=>console.log(`server running on port ${PORT}`))
