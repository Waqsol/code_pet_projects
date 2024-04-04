package my_project.model;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "restaurants")
public class Restaurants {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String cuisine;
    private String opening_hours;
    private String phone;
    private String address;
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getCuisine() {
        return cuisine;
    }
    public void setCuisine(String cuisine) {
        this.cuisine = cuisine;
    }
    public String getOpening_hours() {
        return opening_hours;
    }
    public void setOpening_hours(String opening_hours) {
        this.opening_hours = opening_hours;
    }
    public String getPhone() {
        return phone;
    }
    public void setPhone(String phone) {
        this.phone = phone;
    }
    public String getAddress() {
        return address;
    }
    public void setAddress(String address) {
        this.address = address;
    }
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }

    public Restaurants() {
    }
    @Override
    public String toString() {
        return "Restaurants [name=" + name + ", cuisine=" + cuisine + ", opening_hours=" + opening_hours + ", phone="
                + phone + ", address=" + address + "]";
    }

}
