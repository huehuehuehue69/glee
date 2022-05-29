const mongoose = require("mongoose");

const preferenceSchema = new mongoose.Schema({
    
    genre: {
        28:{
            name:{
                type:String,
                default:"Action"
            },
            value: {
            type:Number,
            default:0
            }
        },
        12:{
            name:{
                type:String,
                default:"Adventure"
            },
            value: {
            type:Number,
            default:0
            }
        },
        16 : {
            name:{
                type:String,
                default:"Animation"
            },
            value: {
            type:Number,
            default:0
            }
        },
        35: {
            name:{
                type:String,
                default:"Comedy"
            },
            value: {
            type:Number,
            default:0
            }
        },
        80 : {
            name:{
                type:String,
                default:"Crime"
            },
            value: {
            type:Number,
            default:0
            }
        },
        99:{
            name:{
                type:String,
                default:"Documentary"
            },
            value: {
            type:Number,
            default:0
            }
        },
        18: {
            name:{
                type:String,
                default:"Drama"
            },
            value: {
            type:Number,
            default:0
            }
        },
        10751 : {
            name:{
                type:String,
                default:"Family"
            },
            value: {
            type:Number,
            default:0
            }
        },
        14: {
            name:{
                type:String,
                default:"Fantasy"
            },
            value: {
            type:Number,
            default:0
            }
        },
        36: {
            name:{
                type:String,
                default:"History"
            },
            value: {
            type:Number,
            default:0
            }
        },
        27: {
            name:{
                type:String,
                default:"Horror"
            },
            value: {
            type:Number,
            default:0
            }
        },
        10402: {
            name:{
                type:String,
                default:"Music"
            },
            value: {
            type:Number,
            default:0
            }
        },
        9648: {
            name:{
                type:String,
                default:"Mystery"
            },
            value: {
            type:Number,
            default:0
            }
        },
        10749: {
            name:{
                type:String,
                default:"Romance"
            },
            value: {
            type:Number,
            default:0
            }
        },
        878: {
            name:{
                type:String,
                default:"Science Fiction"
            },
            value: {
            type:Number,
            default:0
            }
        },
        10770: {
            name:{
                type:String,
                default:"TV Movie"
            },
            value: {
            type:Number,
            default:0
            }
        },
        53: {
            name:{
                type:String,
                default:"Thriller"
            },
            value: {
            type:Number,
            default:0
            }
        },
        10752: {
            name:{
                type:String,
                default:"War"
            },
            value: {
            type:Number,
            default:0
            }
        },
        37: {
            name:{
                type:String,
                default:"Western"
            },
            value: {
            type:Number,
            default:0
            }
        }
    }
    ,
    country:String,
    birthyear:Number,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    mymovie:[]
});

module.exports = mongoose.model('Preference',preferenceSchema);