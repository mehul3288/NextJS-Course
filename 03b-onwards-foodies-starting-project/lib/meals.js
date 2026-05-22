import sql from "better-sqlite3"
const db = sql("meals.db")
import slugify from "slugify"
import xss from "xss"
import fs from "node:fs"

export async function getMeals() {
    await new Promise((res) => setTimeout(res, 2000))
    // throw new Error("Loading meals failed")
    return db.prepare("SELECT * FROM MEALS").all();
}

export async function getMeal(slug) {
    // return db.prepare("SELECT * FROM meals WHERE slug = "+slug); sql injection attack can happen here below is the safe one
    return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug); //here ? is placeholder which will be replaced by argument passed in get

}

export async function saveMeal(meal) {
    meal.slug = slugify(meal.title, { lower: true })
    meal.instruction = xss(meal.instruction);
    const extension = meal.image.name.split(".").pop();
    const fileName = `${meal.slug}.${extension}`;
    const stream = fs.createWriteStream(`public/images/${fileName}`)
    const bufferedImage = await meal.image.arrayBuffer();
    stream.write(Buffer.from(bufferedImage), (error) => {
        if (error) {
            throw new Error("Saving image failed!")
        }
    });
    meal.image = `/images/${fileName}`

    db.prepare(`INSERT INTO meals (title,summary,instructions,creator,creator_email,image,slug) VALUES (@title,@summary,@instructions,@creator,@creator_email,@image,@slug)`).run(meal);
}