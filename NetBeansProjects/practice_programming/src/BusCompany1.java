import java.util.*;
class Bus{
    String BusName;
    int BusType;
    int BusAmount;
    int ReserveBus = 0;
    public Bus(String BusName , int BusType , int BusAmount){
        this.BusName = BusName;
        this.BusType = BusType;
        this.BusAmount = BusAmount;
    }
    public void printStats(){
        System.out.println(BusName);
        if(BusType == 1){
            System.out.println("Fan");
        }else if(BusType == 2){
            System.out.println("P1");
        }else{
            System.out.println("VIP");    
        }
            System.out.println(ReserveBus + " " + BusAmount);
        if(BusAmount - ReserveBus > 0){
            System.out.println("Active");
        }else{
            System.out.println("Inactive");
        }
        
    }
}
public class BusCompany1 {
 public static void main(String[] args) {
 Scanner scan = new Scanner(System.in);
 String id = scan.next();
 int type = scan.nextInt();
 int seats = scan.nextInt();
 Bus b = new Bus(id, type, seats);
 b.printStats();
 }
}
