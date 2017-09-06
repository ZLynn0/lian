package test;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.junit.Test;

import entity.Dept;

public class HelloMyBatis {
	@Test
	public void testdelete() throws IOException {
		String config ="mybatis-core.xml";
		InputStream in =Resources.getResourceAsStream(config);
		//2、根据核心配置文件创建一个工厂对象
		SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(in);
		//3、根据工厂创建session对象
		SqlSession session = sqlSessionFactory.openSession();
		
		int dept1 = session.selectOne("ns.getDeptCount");
		System.out.println(dept1);
		System.out.println("---------删除后");
		//4.执行操作;
		session.delete("ns.delete","50");
		//5、关闭对象
		int dept = session.selectOne("ns.getDeptCount");
		//5、关闭对象
		session.close();
		System.out.println(dept);
	}
	@Test
	public void testupdate() throws IOException {
		String config ="mybatis-core.xml";
		InputStream in =Resources.getResourceAsStream(config);
		//2、根据核心配置文件创建一个工厂对象
		SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(in);
		//3、根据工厂创建session对象
		SqlSession session = sqlSessionFactory.openSession();
		Dept dept=new Dept("haha", 50, "haha");
		//4.执行操作;
		session.update("ns.update",dept);
		//5、关闭对象
		List<Dept> dept2 = session.selectList("ns.getDept");
		//5、关闭对象
		session.close();
		System.out.println(dept2);
	}
	@Test
	public void testinsert() throws IOException {
		String config ="mybatis-core.xml";
		InputStream in =Resources.getResourceAsStream(config);
		//2、根据核心配置文件创建一个工厂对象
		SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(in);
		//3、根据工厂创建session对象
		SqlSession session = sqlSessionFactory.openSession();
		Dept dept=new Dept("haha新的", 60, "haha");
		//4.执行操作;
		session.update("ns.insert",dept);
		//5、关闭对象
		List<Dept> dept2 = session.selectList("ns.getDept");
		//5、关闭对象
		session.close();
		System.out.println(dept2);
	}
	@Test
	public void testgetDeptCount() throws IOException {
		String config ="mybatis-core.xml";
		InputStream in =Resources.getResourceAsStream(config);
		//2、根据核心配置文件创建一个工厂对象
		SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(in);
		//3、根据工厂创建session对象
		SqlSession session = sqlSessionFactory.openSession();
		//4.执行操作;
		int dept = session.selectOne("ns.getDeptCount");
		//5、关闭对象
		session.close();
		System.out.println(dept);
	}
	@Test
	public void testGetDept() throws IOException{
		String config ="mybatis-core.xml";
		InputStream in =Resources.getResourceAsStream(config);
		//2、根据核心配置文件创建一个工厂对象
		SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(in);
		//3、根据工厂创建session对象
		SqlSession session = sqlSessionFactory.openSession();
		//4.执行操作;
		List<Dept> dept = session.selectList("ns.getDept");
		//5、关闭对象
		session.close();
		System.out.println(dept);
	}

	@Test
	public void testGetDeptByDeptNo() {
		String config ="mybatis-core.xml";
		try {
			InputStream in =Resources.getResourceAsStream(config);
			//2、根据核心配置文件创建一个工厂对象
			SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(in);
			//3、根据工厂创建session对象
			SqlSession session = sqlSessionFactory.openSession();
			//4.执行操作;		
			Dept dept = session.selectOne("ns.getDeptByDepeNo","10");
			//5、关闭对象
			session.close();
			System.out.println(dept);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	@Test
	public void testGetDeptlike() throws IOException {
		String config ="mybatis-core.xml";

		InputStream in =Resources.getResourceAsStream(config);
		//2、根据核心配置文件创建一个工厂对象
		SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(in);
		//3、根据工厂创建session对象
		SqlSession session = sqlSessionFactory.openSession();
		//4.执行操作;		
		List<Dept> dept = session.selectList("ns.getDeptlike","傻");
		//5、关闭对象
		session.close();
		System.out.println(dept);

	}

}
