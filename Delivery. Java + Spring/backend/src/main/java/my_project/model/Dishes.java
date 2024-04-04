package my_project.model;

import java.util.Arrays;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "dishes")
public class Dishes {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;



    public Dishes() {
    }
    public Categories getId_category() {
        return id_category;
    }
    public void setId_category(Categories id_category) {
        this.id_category = id_category;
    }
    public Restaurants getId_restaurants() {
        return id_restaurants;
    }
    public void setId_restaurants(Restaurants id_restaurants) {
        this.id_restaurants = id_restaurants;
    }

    @Override
    public String toString() {
        return "Dishes [id=" + id + ", title=" + title + ", description=" + description + ", price=" + price
                + ", id_category=" + id_category + ", id_restaurants=" + id_restaurants + ", image="
                + image + "]";
    }
    public String getImage() {
        return image;
    }
    public void setImage(String image) {
        this.image = image;
    }
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public Integer getPrice() {
        return price;
    }
    public void setPrice(Integer price) {
        this.price = price;
    }
    private String title;
    private String description;
    private Integer price;
    @ManyToOne(targetEntity=Categories.class,fetch = FetchType.EAGER)
    @JoinColumn(name = "id_category")
    private Categories id_category;
    @ManyToOne(targetEntity=Restaurants.class,fetch = FetchType.EAGER)
    @JoinColumn(name = "id_restaurants")
    private Restaurants id_restaurants;
    private String image;
    
}