import cloudinary from '../lib/Cloudnary.js';
import Message from '../models/message.js';
import User from '../models/User.js';

export const getUsersForSidebar=async (req,res)=>{
 try {
  const loggedUserId=req.user._id
  const filteredUsers=await User.find({_id:{$ne:loggedUserId}}).select("-password")
  if(!filteredUsers) return res.status(400).json({message:'users not found'});

  res.status(200).json({message:'users fetched successfully '})
 } catch (error) {
  res.status(500).json({message:"internal server error"});
 }
}


export const getMessage=async (req,res)=>{
  try {
    const {id:myId}=req.user._id;
    const {id:receiverId}=req.body;

    const messages=await Message.find({
      $or:[
        {sender:myId,receiver:receiverId},
        {receiver:myId,sender:receiverId}
      ],
    });
    res.status(200).json(messages)
  } catch (error) {
    res.status(500).json({message:"internal server error"});
  }
}

export const sendMessage = async (req, res) => {
  try {
    const {content,image}=req.body;
    const {id:receiver}= req.params;
    const sender=req.user._id;

    let imageUrl;
    if(image){
      const uploadResponse=await cloudinary.uploader.upload(image);
      imageUrl=uploadResponse.secure_url;
    }

    const newMessage=new Message({
      sender,
      receiver,
      content,
      mediaUrl:imageUrl,
    });

    await newMessage.save();



  res.status(200).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: 'Message sending failed' });
  }
};

export const uploadMedia = async (req, res) => {
  try {
    const { path } = req.file;
    const result = await cloudinary.uploader.upload(path);
    res.json({ mediaUrl: result.secure_url });
  } catch (error) {
    res.status(500).json({ error: 'Media upload failed' });
  }
};
