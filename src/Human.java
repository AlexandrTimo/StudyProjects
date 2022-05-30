public class Human implements Info{
    private String name = "Richard";
    public void greet(){
        System.out.println("Hello!");
    }
    
    // Interface connection -> implements <interface name>
    @Override
    public void showInfo() {
        System.out.println("My name is " + name);
    }
}
