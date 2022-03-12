class User {
    constructor(id, email, name, picture, active, superlikes, age, job, association, bio) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.picture = picture;
        this.active = active;
        this.superlikes = superlikes;

        this.age = age;
        this.job = job;
        this.association = association;
        this.bio = bio;
    }
}

exports.User = User;