import { Address } from "../Models/Address.js"

export const addAddress = async (req, res) => {
    let { fullName, address, city, state, country, pincode, phoneNumber } = req.body
    let userId = req.user
    let userAddress = await Address.create({
        userId,
        fullName,
        address,
        city,
        state,
        country,
        pincode,
        phoneNumber
    })

    
    res.json({ message: "Address Added Successfully!!!", userAddress, success: true })

}

// get the latest address of the user 
export const getAddress = async (req, res) => {
    let address = await Address.find({userId:req.user}).sort({createddAt: -1})
    res.json({message: "User Address", userAddress:address[0]})


}

