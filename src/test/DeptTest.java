package test;

import java.io.IOException;
import java.io.InputStream;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.junit.Test;

import dao.DeptDao;
import entity.Dept;

public class DeptTest {
	private static SqlSessionFactory factory=null;
	static{
		String resourse="mybatis-core.xml";

			InputStream inputStream;
			try {
				inputStream = Resources.getResourceAsStream(resourse);
				factory=new SqlSessionFactoryBuilder().build(inputStream);

			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			
	}
	@Test
	public void testDeptno(){
		DeptDao dao=new DeptDao(factory);
		Dept dept=dao.getDeptByDeptno(10);
		System.out.println(dept);
	}
	@Test
	public void testinsert(){
		DeptDao dao=new DeptDao(factory);
		Dept dept=new Dept("dd", 90, "dd");
		dao.insert(dept);
	}	@Test
	public void testupdate(){
		DeptDao dao=new DeptDao(factory);
		Dept dept=new Dept("aa", 90, "aa");
		dao.update(dept);
	}
	@Test
	public void testdelete(){
		DeptDao dao=new DeptDao(factory);
		
		Integer deptno=90;
		dao.delete(deptno);
	}
}
